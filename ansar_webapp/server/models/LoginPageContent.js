const mongoose = require('mongoose');

const LoginPageContentSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  leftPanel: {
    orgLogo: String,
    orgName: String,
    orgTagline: String,
    mainTitle: String,
    mainDescription: String,
    whyChoose: {
      title: String,
      reasons: [
        {
          icon: String,
          title: String,
          desc: String
        }
      ]
    },
    stats: [
      {
        icon: String,
        label: String,
        value: String
      }
    ],
    testimonial: {
      quote: String,
      author: String,
      meta: String
    }
  },
  tabs: [
    {
      key: String,
      label: String,
      icon: String
    }
  ],
  emailForm: {
    emailLabel: String,
    emailPlaceholder: String,
    passwordLabel: String,
    passwordPlaceholder: String,
    rememberMe: String,
    forgotPassword: String,
    signInButton: String,
    dontHaveAccountText: String
  },
  mobileForm: {
    countryCodeLabel: String,
    mobileLabel: String,
    mobilePlaceholder: String,
    sendCodeButton: String,
    verifyButton: String,
    resendCode: String,
    verificationLabel: String,
    verificationPlaceholder: String
  },
  signupForm: {
    nameLabel: String,
    namePlaceholder: String,
    emailLabel: String,
    emailPlaceholder: String,
    passwordLabel: String,
    passwordPlaceholder: String,
    confirmPasswordLabel: String,
    confirmPasswordPlaceholder: String,
    agreeTerms: String,
    signUpButton: String,
    alreadyHaveAccount: String
  },
  helpText: {
    title: String,
    items: [String]
  },
  socialLogins: [
    {
      provider: String,
      icon: String
    }
  ],
  securityFeatures: {
    title: String,
    desc: String,
    features: [String]
  },
  footer: {
    terms: String,
    privacy: String
  },
  dontHaveAccountText: String
});

module.exports = mongoose.model('LoginPageContent', LoginPageContentSchema);
