import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelopeOpenText, FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa';

// Import mock data
import contactPageData from '../data/contactPageData.json';

const iconMap = {
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegEnvelope
};

const ContactPage = () => {
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [faqOpen, setFaqOpen] = useState(null);
  const [content, setContent] = useState(contactPageData); // Use mock data directly
  const [loading, setLoading] = useState(false); // No longer loading since we're using mock data

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Using mock data directly, no API calls needed
  useEffect(() => {
    // Set default form fields if available
    if (contactPageData && contactPageData.form && contactPageData.form.fields) {
      const initial = {};
      contactPageData.form.fields.forEach(f => {
        initial[f.name] = f.type === 'checkbox' ? false : '';
      });
      setFormData(initial);
    }
    setLoading(false);
  }, []);

  const validateFields = () => {
    const errors = {};
    if (!contactPageData || !contactPageData.form || !contactPageData.form.fields) return errors;
    contactPageData.form.fields.forEach(field => {
      const value = formData[field.name];
      if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors[field.name] = `${field.label || field.name} is required.`;
      }
      if (field.validation && value) {
        if (field.validation.pattern && !(new RegExp(field.validation.pattern).test(value))) {
          errors[field.name] = `Invalid ${field.label || field.name}.`;
        }
        if (field.validation.minLength && value.length < field.validation.minLength) {
          errors[field.name] = `${field.label || field.name} must be at least ${field.validation.minLength} characters.`;
        }
      }
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccess(false);
    const errors = validateFields();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
    // Simulate form submission with mock data
    try {
      // In a real implementation, this would be an API call
      // For now, we'll just show a success message
      setFormError('');
      setFieldErrors({});
      setSuccess(true);
      // Clear form
      if (contactPageData && contactPageData.form && contactPageData.form.fields) {
        const initial = {};
        contactPageData.form.fields.forEach(f => {
          initial[f.name] = f.type === 'checkbox' ? false : '';
        });
        setFormData(initial);
      }
    } catch (err) {
      setFormError('Submission failed');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!content) return <div className="min-h-screen flex items-center justify-center text-red-600">Failed to load content.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-800 to-primary-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-opacity-20" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }}></div>
        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex mb-6 items-center justify-center p-2 bg-primary-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-primary-600 shadow-lg">
              <FaEnvelopeOpenText className="mr-2 text-primary-200" />
              <span className="text-sm font-medium text-primary-200 uppercase tracking-wider">Contact Us</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              <span className="block">{content.hero?.heading || 'Get In Touch'}</span>
              <span className="block text-primary-300 mt-1">{content.hero?.subheading || "We're here to help you"}</span>
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
              {content.hero?.description || ''}
              <span className="block italic mt-1 text-primary-200 text-lg">- {content.hero?.quoteBy || 'Ansar Organization'}</span>
            </p>
          </motion.div>
        </div>
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto" fill="#f9fafb">
            <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      {/* Contact Info & Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Section */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <div className="px-6 py-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <span className="bg-primary-100 p-2 rounded-full mr-3">
                    <FaMapMarkerAlt className="text-primary-600 text-xl" />
                  </span>
                  {content.infoSection?.officeTitle || 'Our Office'}
                </h2>
                <div className="mt-6 prose prose-primary text-gray-600 max-w-none">
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><FaRegEnvelope className="mr-2 text-primary-500" /> <span className="font-semibold">Email:</span> {content.infoSection?.email}</li>
                    <li className="flex items-center"><FaPhoneAlt className="mr-2 text-primary-500" /> <span className="font-semibold">Phone:</span> {content.infoSection?.phone}</li>
                    <li className="flex items-center"><FaMapMarkerAlt className="mr-2 text-primary-500" /> <span className="font-semibold">Address:</span> {content.infoSection?.address}</li>
                  </ul>
                  <p className="mt-6 text-lg">{content.infoSection?.description}</p>
                </div>
              </div>
            </motion.div>
          {/* Benefits/Features Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-xl shadow-sm border border-primary-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 flex items-center mb-8">
              <span className="bg-primary-100 p-2 rounded-full mr-3">
                <FaEnvelopeOpenText className="text-primary-600 text-xl" />
              </span>
              Why Contact Us?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.benefits?.map((b, i) => {
                const Icon = iconMap[b.icon] || FaRegEnvelope;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex"
                  >
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{b.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{b.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          {/* Map Section - moved here */}
          <div className="w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-lg border-2 border-primary-100 flex items-center justify-center bg-white md:mr-8 md:mt-6 mt-4 p-4">
            <iframe
              title={content.map?.title || 'Map'}
              src={content.map?.src}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420, minWidth: '100%' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
          </div>
          {/* Form Section */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-xl rounded-xl overflow-hidden sticky top-24"
            >
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
                <h2 className="text-2xl font-bold flex items-center">
                  <FaEnvelopeOpenText className="mr-3 text-primary-200" />
                  {content.form?.title || 'Contact Form'}
                </h2>
                <p className="mt-2 text-primary-100">{content.form?.subtitle || "Send us a message and we'll get back to you soon"}</p>
              </div>
              <div className="px-6 py-8">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {success ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                      <h3 className="text-2xl font-bold text-green-700 mb-2">Success!</h3>
                      <p className="text-green-600 mb-6">Your message has been sent successfully!</p>
                      <button
                        className="px-6 py-2 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition"
                        onClick={() => setSuccess(false)}
                      >Send another message</button>
                    </div>
                  ) : (
                    <>
                      {(formError || Object.values(fieldErrors).length > 0) && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-semibold">
                          {formError || Object.values(fieldErrors)[0]}
                        </div>
                      )}
                      <div className="flex flex-col gap-4">
                        {content.form?.fields?.map((field, idx) => {
                          if (field.type === 'textarea') {
                            return (
                              <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                                <textarea
                                  name={field.name}
                                  id={field.name}
                                  rows={field.rows || 3}
                                  value={formData[field.name] || ''}
                                  onChange={handleInputChange}
                                  placeholder={field.placeholder}
                                  className={`block w-full border-0 border-b-4 border-b-green-600 rounded-none ${fieldErrors[field.name] ? 'border-b-red-500' : ''} focus:border-b-green-800 bg-transparent py-2 px-1 text-sm focus:outline-none transition-all resize-none`}
                                  required={field.required}
                                />
                                {fieldErrors[field.name] && <p className="text-xs text-red-600 mt-1">{fieldErrors[field.name]}</p>}
                              </div>
                            );
                          }
                          if (field.type === 'select') {
                            return (
                              <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                                <select
                                  name={field.name}
                                  id={field.name}
                                  value={formData[field.name] || ''}
                                  onChange={handleInputChange}
                                  className={`block w-full border-0 border-b-4 border-b-green-600 rounded-none ${fieldErrors[field.name] ? 'border-b-red-500' : ''} focus:border-b-green-800 bg-transparent py-2 px-1 text-sm focus:outline-none transition-all`}
                                  required={field.required}
                                >
                                  <option value="">{field.placeholder || 'Select an option'}</option>
                                  {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                {fieldErrors[field.name] && <p className="text-xs text-red-600 mt-1">{fieldErrors[field.name]}</p>}
                              </div>
                            );
                          }
                          if (field.type === 'radio') {
                            return (
                              <div key={field.name}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                                <div className="flex gap-8 mt-1">
                                  {field.options?.map(opt => (
                                    <label key={opt} className={`flex items-center cursor-pointer px-3 py-1 rounded-full border-2 ${formData[field.name] === opt ? 'border-primary-600 bg-primary-50' : 'border-primary-200 bg-white'} hover:bg-primary-100 transition-all`}>
                                      <input
                                        type="radio"
                                        name={field.name}
                                        value={opt}
                                        checked={formData[field.name] === opt}
                                        onChange={handleInputChange}
                                        className="accent-primary-600 w-5 h-5"
                                      />
                                      <span className="ml-2 text-primary-700 font-bold text-base">{opt}</span>
                                    </label>
                                  ))}
                                </div>
                                {fieldErrors[field.name] && <p className="text-xs text-red-600 mt-1">{fieldErrors[field.name]}</p>}
                              </div>
                            );
                          }
                          // Default to input
                          return (
                            <div key={field.name}>
                              <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                              <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className={`block w-full border-0 border-b-4 border-b-green-600 rounded-none ${fieldErrors[field.name] ? 'border-b-red-500' : ''} focus:border-b-green-800 bg-transparent py-2 px-1 text-sm focus:outline-none transition-all`}
                                pattern={field.validation?.pattern}
                                minLength={field.validation?.minLength}
                                required={field.required}
                              />
                              {fieldErrors[field.name] && <p className="text-xs text-red-600 mt-1">{fieldErrors[field.name]}</p>}
                            </div>
                          );
                        })}
                        <div>
                          <button
                            type="submit"
                            className="mt-2 py-2 px-6 bg-primary-600 text-white rounded-full shadow hover:bg-primary-700 transition-all text-sm w-fit self-end"
                          >
                            {content.form?.buttonText || 'Send Message'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* FAQ Section Only (map removed) */}
      <div className="max-w-3xl mx-auto mt-16 mb-20 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-primary-700 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6 w-full">
          {content.faqs?.map((faq, idx) => (
            <div key={idx} className="border-2 border-primary-100 rounded-2xl shadow-lg bg-white hover:bg-primary-50 transition-all duration-200 w-full">
              <button
                type="button"
                className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold text-left focus:outline-none focus:ring-2 focus:ring-primary-500 text-primary-700"
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <span className="ml-2 text-primary-600">{faqOpen === idx ? '−' : '+'}</span>
              </button>
              {faqOpen === idx && (
                <div className="px-4 pb-3 text-gray-700 text-sm animate-fade-in bg-primary-50 rounded-b-2xl">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;