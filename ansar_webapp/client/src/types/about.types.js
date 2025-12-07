// Type definitions for About page data
export const AboutPageDataShape = {
  hero: {
    title: '',
    description: '',
    backgroundImage: undefined,
  },
  stats: [],
  overview: {
    story: {
      title: '',
      content: [],
    },
    programs: [],
  },
  governance: {
    title: '',
    description: [],
    items: [],
    commitment: {
      title: '',
      transparency: [],
      accountability: [],
    },
  },
  media: {
    news: [],
    categories: [],
    social: [],
  },
  transparency: {
    title: '',
    description: [],
    reports: [],
    items: [],
    certifications: [],
  },
  cta: {
    title: '',
    description: '',
    buttons: [],
  },
};

export const AboutPageResponseShape = {
  success: true,
  data: AboutPageDataShape,
  error: undefined,
}; 