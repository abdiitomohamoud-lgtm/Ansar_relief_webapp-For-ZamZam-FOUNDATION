const mongoose = require('mongoose');

const volunteerPageDataSchema = new mongoose.Schema({
  hero: {
    heading: String,
    subheading: String,
    cta: [String],
    quote: {
      text: String,
      author: String
    }
  },
  infoSection: {
    heading: String,
    description: String
  },
  programsSection: {
    heading: String,
    programs: [
      {
        title: String,
        icon: String,
        description: String,
        demand: String,
        opportunity: String
      }
    ]
  },
  benefitsSection: {
    heading: String,
    icon: String,
    benefits: [
      {
        title: String,
        description: String,
        icon: String
      }
    ]
  },
  statsSection: {
    heading: String,
    stats: [
      {
        label: String,
        value: String,
        icon: String
      }
    ]
  },
  formSection: {
    steps: [
      {
        title: String,
        fields: [
          {
            name: String,
            label: String,
            options: [String]
          }
        ]
      }
    ],
    buttons: [String],
    completion: {
      heading: String,
      description: String
    },
    alert: String
  },
  testimonialsSection: {
    heading: String,
    description: String,
    testimonials: [
      {
        name: String,
        role: String,
        image: String,
        icon: String,
        testimonial: String
      }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('VolunteerPageData', volunteerPageDataSchema);
