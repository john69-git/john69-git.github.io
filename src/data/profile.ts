import type { NavLink, SocialLink, StoryChapter } from './types'

/* ==================================================================
   PROFILE — your personal info. Edit freely.
   Anything left as '' or [] is hidden on the live site, and shows up
   as a dashed "EDIT ME" hint only while you run `npm run dev`.
   ================================================================== */

export const profile = {
  nickname: 'HAISE',
  nicknameJp: 'ハイセ',
  /** Your real name. Shown under the hero heading and on the About card. Set to '' to hide. */
  fullName: 'John Jerick Bernardo Barrios',
  role: 'Computer Engineering Student',
  location: 'Philippines',

  /**
   * Optional photo of you. Put the file in /public/images and write e.g. 'images/me.jpg'.
   * While empty, the site shows abstract artwork instead (never a fake portrait).
   */
  photo: 'images/me.jpg',

  hero: {
    eyebrow: 'Welcome to my corner of the internet',
    greeting: "Hey, I'm",
    intro:
      "Computer Engineering student, technology enthusiast, and someone who's always curious about what I can create.",
    tagline: 'Learning, building, and becoming.',
  },

  about: {
    intro:
      "I'm a Computer Engineering student exploring the intersection of software, hardware, and technology. I enjoy learning new things, experimenting with ideas, and turning what I learn into projects. I'm still growing, and every project gives me another opportunity to improve.",

    /** Your story, in your own words. Empty chapters are hidden on the live site. */
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

  /** The "Currently learning" widget. Keep it short (2–4 items). */
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
    /** Your email address, e.g. 'you@example.com'. Empty = hidden. */
    email: '',
    socials: [
      { label: 'GitHub', url: '', icon: 'github' },
      { label: 'LinkedIn', url: '', icon: 'linkedin' },
      // Add more: { label: 'Facebook', url: 'https://facebook.com/…', icon: 'facebook' },
      // icon options: 'github' | 'linkedin' | 'facebook' | 'instagram' | 'globe' | 'link'
    ] as SocialLink[],
  },

  footerMessage: 'Thanks for stopping by. Still learning, still building.',

  features: {
    /** Soft light that follows the mouse (desktop only, off for reduced-motion users). */
    cursorGlow: true,
  },
}

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'interests', label: 'Interests' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'My Journey' },
  { id: 'contact', label: 'Contact' },
]
