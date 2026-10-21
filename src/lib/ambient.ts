/**
 * Generative ambient soundtrack — no audio files needed; everything is synthesized
 * live with the Web Audio API, so it never loops exactly the same way:
 *   · a slow, soft chord pad in A minor (Am – F – C – G), mid-range so laptop and
 *     phone speakers can actually play it
 *   · a music-box melody drifting over it (pentatonic, with rests, never repeating)
 *   · gentle rain, filtered into the range small speakers reproduce
 *   · a small generated "room" echo that ties it all together
 *
 * Optional: set `profile.features.soundtrack` to an audio file in /public
 * (e.g. 'audio/theme.mp3') to play your own music instead.
 *
 * Browsers only allow audio after a click, and the navbar toggle is that click.
 */
type AudioCtx = typeof AudioContext

const MASTER_LEVEL = 0.55

/** Chord progression (frequencies in Hz), each held for one bar. */
const CHORDS: number[][] = [
  [220.0, 261.63, 329.63], // Am
  [174.61, 220.0, 261.63], // F
  [196.0, 261.63, 329.63], // C (2nd inversion)
  [196.0, 246.94, 293.66], // G
]
/** Melody notes per chord: A-minor pentatonic, one octave up, leaning on chord tones. */
const MELODY: number[][] = [
  [659.25, 783.99, 880.0, 1046.5, 587.33],
  [698.46, 880.0, 1046.5, 587.33, 523.25],
  [659.25, 783.99, 1046.5, 523.25, 587.33],
  [587.33, 783.99, 987.77, 659.25, 880.0],
]
const BAR_SECONDS = 6.4
const STEP_SECONDS = BAR_SECONDS / 8

export class AmbientSound {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private bus: GainNode | null = null
  private timer = 0
  private stopTimer = 0
  private nextTime = 0
  private step = 0
  private audioEl: HTMLAudioElement | null = null
  running = false

  constructor(private readonly soundtrack = '') {}

  static isSupported() {
    return (
      typeof window !== 'undefined' &&
      Boolean(window.AudioContext || (window as unknown as { webkitAudioContext?: AudioCtx }).webkitAudioContext)
    )
  }

  private build() {
    const Ctor: AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: AudioCtx }).webkitAudioContext
    const ctx = new Ctor()

    // master → gentle compressor (keeps it smooth, no clipping) → speakers
    const master = ctx.createGain()
    master.gain.value = 0
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.ratio.value = 3
    master.connect(comp).connect(ctx.destination)

    // a small generated room: decaying stereo noise as an impulse response
    const reverb = ctx.createConvolver()
    const len = Math.floor(ctx.sampleRate * 2.8)
    const ir = ctx.createBuffer(2, len, ctx.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
    }
    reverb.buffer = ir
    const wet = ctx.createGain()
    wet.gain.value = 0.45
    reverb.connect(wet).connect(master)

    // everything musical goes through `bus` (dry + reverb send)
    const bus = ctx.createGain()
    bus.connect(master)
    bus.connect(reverb)

    // rain: white noise, band-passed into the range small speakers play
    const nLen = ctx.sampleRate * 3
    const nBuf = ctx.createBuffer(1, nLen, ctx.sampleRate)
    const nd = nBuf.getChannelData(0)
    for (let i = 0; i < nLen; i++) nd[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = nBuf
    noise.loop = true
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 2400
    band.Q.value = 0.6
    const rainGain = ctx.createGain()
    rainGain.gain.value = 0.05
    // the rain swells and eases very slowly
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.05
    const lfoDepth = ctx.createGain()
    lfoDepth.gain.value = 0.02
    lfo.connect(lfoDepth).connect(rainGain.gain)
    lfo.start()
    noise.connect(band).connect(rainGain).connect(master)
    noise.start()

    this.ctx = ctx
    this.master = master
    this.bus = bus
  }

  /** One soft pad chord: detuned triangle waves through a warm low-pass, slow swell. */
  private pad(freqs: number[], at: number) {
    const ctx = this.ctx!
    const out = ctx.createGain()
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1400
    out.gain.setValueAtTime(0.0001, at)
    out.gain.linearRampToValueAtTime(0.07, at + 1.6)
    out.gain.setValueAtTime(0.07, at + BAR_SECONDS - 1.2)
    out.gain.linearRampToValueAtTime(0.0001, at + BAR_SECONDS + 1.4)
    lp.connect(out).connect(this.bus!)
    for (const f of freqs) {
      for (const detune of [-6, 6]) {
        const o = ctx.createOscillator()
        o.type = 'triangle'
        o.frequency.value = f
        o.detune.value = detune
        o.connect(lp)
        o.start(at)
        o.stop(at + BAR_SECONDS + 1.6)
      }
    }
    // a low root note an octave down so the harmony has a floor (still speaker-friendly)
    const root = ctx.createOscillator()
    root.type = 'sine'
    root.frequency.value = freqs[0] / 2
    const rg = ctx.createGain()
    rg.gain.setValueAtTime(0.0001, at)
    rg.gain.linearRampToValueAtTime(0.06, at + 1)
    rg.gain.linearRampToValueAtTime(0.0001, at + BAR_SECONDS + 1)
    root.connect(rg).connect(this.bus!)
    root.start(at)
    root.stop(at + BAR_SECONDS + 1.2)
  }

  /** One music-box note: a bell-like sine with two faint overtones and a long decay. */
  private bell(freq: number, at: number, level = 0.12) {
    const ctx = this.ctx!
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, at)
    g.gain.exponentialRampToValueAtTime(level, at + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, at + 2.6)
    g.connect(this.bus!)
    for (const [mult, amp] of [
      [1, 1],
      [2, 0.25],
      [3.01, 0.08],
    ] as const) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = freq * mult
      const og = ctx.createGain()
      og.gain.value = amp
      o.connect(og).connect(g)
      o.start(at)
      o.stop(at + 2.7)
    }
  }

  /** Look-ahead scheduler: queues notes a little ahead of time so playback stays smooth. */
  private schedule = () => {
    const ctx = this.ctx
    if (!ctx || !this.running) return
    while (this.nextTime < ctx.currentTime + 0.6) {
      const bar = Math.floor(this.step / 8) % CHORDS.length
      const beat = this.step % 8
      if (beat === 0) this.pad(CHORDS[bar], this.nextTime)
      // melody: likelier on strong beats, with plenty of rests so it breathes
      const chance = beat === 0 ? 0.9 : beat % 2 === 0 ? 0.55 : 0.25
      if (Math.random() < chance) {
        const notes = MELODY[bar]
        const n = notes[Math.floor(Math.random() * notes.length)]
        this.bell(n, this.nextTime + (Math.random() - 0.5) * 0.03, beat === 0 ? 0.13 : 0.09)
      }
      this.nextTime += STEP_SECONDS
      this.step++
    }
    this.timer = window.setTimeout(this.schedule, 150)
  }

  async start() {
    // your own track, if one is configured
    if (this.soundtrack) {
      this.audioEl ??= Object.assign(new Audio(this.soundtrack), { loop: true, volume: 0.6 })
      await this.audioEl.play()
      this.running = true
      return
    }
    if (!this.ctx) this.build()
    const ctx = this.ctx!
    window.clearTimeout(this.stopTimer)
    if (ctx.state === 'suspended') await ctx.resume()
    const g = this.master!.gain
    g.cancelScheduledValues(ctx.currentTime)
    g.setValueAtTime(g.value, ctx.currentTime)
    g.linearRampToValueAtTime(MASTER_LEVEL, ctx.currentTime + 2)
    if (!this.running) {
      this.running = true
      this.nextTime = ctx.currentTime + 0.1
      this.step = 0
      window.clearTimeout(this.timer)
      this.schedule()
    }
  }

  stop() {
    this.running = false
    window.clearTimeout(this.timer)
    if (this.audioEl) {
      this.audioEl.pause()
      return
    }
    const ctx = this.ctx
    if (!ctx || !this.master) return
    const g = this.master.gain
    g.cancelScheduledValues(ctx.currentTime)
    g.setValueAtTime(g.value, ctx.currentTime)
    g.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
    this.stopTimer = window.setTimeout(() => void ctx.suspend(), 700)
  }

  dispose() {
    this.stop()
    window.clearTimeout(this.stopTimer)
    void this.ctx?.close()
    this.ctx = null
    this.master = null
    this.bus = null
    this.audioEl = null
  }
}
