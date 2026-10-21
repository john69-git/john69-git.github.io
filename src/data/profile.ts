import type { NavLink, SocialLink, StoryChapter } from './types'

/* ==================================================================
   PROFILE — your personal info. Edit freely.
   Anything left as '' or [] is hidden on the live site, and shows up
   as a dashed "EDIT ME" hint only while you run `npm run dev`.

   Image paths: files live in /public/images and are written WITHOUT
   a leading slash, e.g. 'images/me.jpg'.
   ================================================================== */

export const profile = {
  nickname: 'HAISE',
  nicknameJp: 'ハイセ',
  /** Your real name. Shown in the hero intro, About and footer. */
  fullName: 'John Jerick Bernardo Barrios',
  shortName: 'John Jerick B. Barrios',
  role: 'Computer Engineering Student',
  school: 'ICCT Colleges · Cainta main campus',
  location: 'Philippines',

  /** Your pixel-art avatar (background removed) — the centerpiece of the hero. */
  avatar: {
    src: 'images/avatar-haise.webp',
    alt: 'Pixel-art avatar of HAISE: black hair, open black overshirt over a white tee, black trousers and white sneakers, one hand in a pocket.',
    width: 720,
    height: 1453,
  },

  /** Your real photo, shown on the About profile card. Set src to '' to hide it. */
  photo: {
    src: 'images/me.jpg',
    alt: 'Portrait of John Jerick Bernardo Barrios.',
    width: 880,
    height: 1100,
  },

  /** Your neon city photograph, shown in About. */
  cityPhoto: {
    src: 'images/neon-city.webp',
    alt: 'John in silhouette at night, standing in a city plaza beneath a huge glowing pink LED billboard.',
    width: 1080,
    height: 607,
    caption: 'After dark, under neon.',
    captionJp: '夜の街',
  },

  hero: {
    title: 'HAISE',
    tagline: 'Between Logic and Imagination.',
    taglineJp: '論理と想像のあいだ',
    intro:
      "I'm John Jerick B. Barrios, a Computer Engineering student exploring the intersection of technology, creativity, and purposeful design.",
    /** Small line in the lower-right corner of the hero (from the previous version of the site). */
    footnote: 'Learning, building, and becoming.',
  },

  about: {
    intro:
      "I'm a Computer Engineering student exploring the intersection of software, hardware, and technology. I enjoy learning new things, experimenting with ideas, and turning what I learn into projects. I'm still growing, and every project gives me another opportunity to improve.",

    chapters: [
      {
        title: 'Who I am',
        prompt: 'Your personality and the values you care about.',
        text: "I'm a curious problem-solver driven by continuous growth, precision, and a love for building meaningful tech.",
      },
      {
        title: 'Why Computer Engineering',
        prompt: 'What made you choose Computer Engineering?',
        text: "I'm fascinated by how hardware and software come together to turn logical ideas into physical systems.",
      },
      {
        title: 'What keeps me learning',
        prompt: 'What motivates you to keep learning and building?',
        text: 'The thrill of solving complex problems and turning raw code and circuits into functional tools.',
      },
      {
        title: 'Outside of class',
        prompt: 'Your interests and hobbies outside academics.',
        text: 'I enjoy exploring 2D/3D design, working on personal dev projects, riding, and watching Ghibli films.',
      },
      {
        title: 'Where I want to go',
        prompt: 'Your goals for the future.',
        text: 'I want to become a skilled engineer who builds smart, scalable systems that solve real-world problems.',
      },
    ] satisfies StoryChapter[],
  },

  /** A short personal quote. Replace it with anything that feels like you. */
  quote: {
    text: 'Every project is another chance to improve.',
    author: 'HAISE',
  },

  /** The "Currently learning" panel in Skills. Keep it short (2–4 items). */
  currentlyLearning: ['Flutter & Dart', 'Arduino & sensors', 'Control systems'],

  /**
   * Favorites — hidden until you add real ones.
   * e.g. music: ['Artist or song'], anime: ['Title'], inspiration: ['Person, idea, or thing']
   */
  favorites: {
    music: [] as string[],
    anime: [] as string[],
    inspiration: [] as string[],
  },

  contact: {
    heading: "Let's connect.",
    text: "Whether it's about technology, projects, ideas, or opportunities to learn together, feel free to reach out.",
    /** Your email address, e.g. 'you@example.com'. Empty = hidden on the live site. */
    email: 'johnjbarrios17@gmail.com',
    socials: [
      { label: 'GitHub', url: 'https://github.com/john69-git', icon: 'github', handle: '@john69-git' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/johnjerickbarrios/', icon: 'linkedin', handle: 'johnjerickbarrios' },
      { label: 'Instagram', url: 'https://www.instagram.com/haisee_69/', icon: 'instagram', handle: '@haisee_69' },
      { label: 'Facebook', url: 'https://www.facebook.com/haisebernardobarrios.96', icon: 'facebook', handle: 'haisebernardobarrios.96' },
      // Discord profile links use the numeric user ID; the handle shown is your username.
      { label: 'Discord', url: 'https://discord.com/users/555286335422988289', icon: 'discord', handle: 'tsukiii__.' },
      // icon options: 'github' | 'linkedin' | 'facebook' | 'instagram' | 'discord' | 'globe' | 'link'
    ] as SocialLink[],
  },

  footerMessage: 'Thanks for stopping by. Still learning, still building.',

  features: {
    /** Show the dashed "Edit me" hints while running `npm run dev`. They never appear on the live site. */
    editHints: false,
    /** Soft crimson light that follows the mouse (desktop only, off for reduced-motion users). */
    cursorGlow: true,
    /** Show the ambient-sound toggle in the navbar. Sound is always OFF until the visitor turns it on. */
    ambientSound: false, // hidden for now — set to true to bring the speaker button back
    /**
     * Optional: your own music instead of the generated soundtrack.
     * Put the file in /public/audio and write e.g. 'audio/theme.mp3'.
     * Only use music you own or have permission to publish. '' = generated soundtrack.
     */
    soundtrack: '',
  },
}

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home', chapter: '00' },
  { id: 'about', label: 'About Me', short: 'About', chapter: '01' },
  { id: 'interests', label: 'Interests', chapter: '02' },
  { id: 'skills', label: 'Skills', chapter: '03' },
  { id: 'projects', label: 'Projects', chapter: '04' },
  { id: 'journey', label: 'My Journey', short: 'Journey', chapter: '05' },
  { id: 'contact', label: 'Contact', chapter: '終' },
]
