const mongoose = require('mongoose');

const ContactPageContentSchema = new mongoose.Schema({
  hero: {
    heading: String,
    subheading: String,
    description: String,
    quote: String,
    quoteBy: String,
    backgroundImage: String
  },
  infoSection: {
    officeTitle: String,
    email: String,
    phone: String,
    address: String,
    description: String
  },
  benefits: [
    {
      icon: String,
      title: String,
      description: String
    }
  ],
  map: {
    title: String,
    src: String
  },
  form: {
    title: String,
    subtitle: String,
    // Allow fields to be array of objects or any type to prevent CastError
    fields: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    buttonText: String
  },
  faqs: [
    {
      question: String,
      answer: String
    }
  ]
}, { collection: 'contact_page_content' });

module.exports = mongoose.model('ContactPageContent', ContactPageContentSchema);
