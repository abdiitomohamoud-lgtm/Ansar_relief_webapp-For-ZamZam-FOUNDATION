const mongoose = require('mongoose');

const SadaqahOptionSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    image: String,
    iconName: String,
    cta: String,
    isPeriodic: Boolean,
    goal: Number,
    raised: Number,
    location: String,
    donors: Number,
    daysLeft: Number,
    interval: String,
    day: String,
    days: [String],
    amount: Number,
    perDay: Boolean,
    customAmount: Boolean,
  },
  { _id: false }
);

const SadaqahSchema = new mongoose.Schema({
  tabs: [
    {
      id: String,
      label: String,
    },
  ],
  hero: {
    tagline: String,
    heading: String,
    subheading: String,
    hadith: String,
    hadithSource: String,
    buttons: [
      {
        text: String,
        anchor: String,
      },
    ],
    popularTitle: String,
    popularSubtitle: String,
    popularOptions: [
      {
        id: String,
        title: String,
        subtitle: String,
        iconName: String,
      },
    ],
  },
  sectionHeadings: {
    chooseTypeTitle: String,
    chooseTypeSubtitle: String,
    immediateTitle: String,
    immediateSubtitle: String,
    periodicTitle: String,
    periodicSubtitle: String,
    kafaratTitle: String,
    kafaratSubtitle: String,
    aqiqahTitle: String,
    aqiqahSubtitle: String,
    specificTitle: String,
    specificSubtitle: String,
    donationFormTitle: String,
    donationFormSubtitle: String,
    benefitsTagline: String,
    benefitsTitle: String,
    benefitsSubtitle: String,
    faqTagline: String,
    faqTitle: String,
    faqSubtitle: String,
  },
  options: {
    general: [SadaqahOptionSchema],
    immediate: [SadaqahOptionSchema],
    periodic: [SadaqahOptionSchema],
    kafarat: [SadaqahOptionSchema],
    aqiqah: [SadaqahOptionSchema],
    specific: [SadaqahOptionSchema],
  },
  benefits: [
    {
      title: String,
      description: String,
      iconName: String,
    },
  ],
  faq: [
    {
      question: String,
      answer: String,
    },
  ],
  cta: {
    tagline: String,
    hadith: String,
    source: String,
    text: String,
    button: String,
  },
});

module.exports = mongoose.model('Sadaqah', SadaqahSchema);