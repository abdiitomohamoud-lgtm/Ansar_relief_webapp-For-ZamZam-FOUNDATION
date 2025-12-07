import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Dashboard Overview': 'Dashboard Overview',
      'User Management': 'User Management',
      'Content Management': 'Content Management',
      'Messages & Feedback': 'Messages & Feedback',
      'Settings & Preferences': 'Settings & Preferences',
      'Edit': 'Edit',
      'Delete': 'Delete',
      'Submit': 'Submit',
      // Add more translations as needed
    },
  },
  // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
