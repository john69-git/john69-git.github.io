import { useCallback, useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { asset } from '../lib/asset'
import { AmbientSound } from '../lib/ambient'

/** On/off control for the generative ambient sound. Always starts OFF. */
export function useAmbientSound() {
  const engine = useRef<AmbientSound | null>(null)
  const [playing, setPlaying] = useState(false)
  const [supported] = useState(() => AmbientSound.isSupported())

  useEffect(() => () => engine.current?.dispose(), [])

  // Pause when the tab is hidden, resume when the visitor comes back.
  useEffect(() => {
    if (!playing) return
    const onVisibility = () => {
      if (document.hidden) engine.current?.stop()
      else void engine.current?.start()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [playing])

  const toggle = useCallback(async () => {
    if (!supported) return
    engine.current ??= new AmbientSound(profile.features.soundtrack ? asset(profile.features.soundtrack) : '')
    if (engine.current.running) {
      engine.current.stop()
      setPlaying(false)
    } else {
      try {
        await engine.current.start()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }, [supported])

  return { playing, supported, toggle }
}
