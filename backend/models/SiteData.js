import mongoose from 'mongoose';

const SiteDataSchema = new mongoose.Schema({
  url: { type: String, required: true },
  business_name: String,
  about_section: String,
  faq: [{
    question: String,
    answer: String
  }],
  contact: {
    email: String,
    phone: String,
    address: String
  },
  footer_text: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('SiteData', SiteDataSchema);