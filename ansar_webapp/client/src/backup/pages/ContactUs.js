import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/slices/appSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ContactUs = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateForm = () => {
    const { name, email, message } = formData;
    
    if (!name || !email || !message) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please fill in all required fields',
      }));
      return false;
    }
    
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please enter a valid email address',
      }));
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      dispatch(addNotification({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.',
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      }));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out with any questions or feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info Section */}
          <div className="lg:col-span-5">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Get in Touch
                </h2>
                <div className="mt-6 space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <h3 className="text-sm font-medium text-gray-800">Our Address</h3>
                      <div className="mt-1">
                        123 Charity Lane<br />
                        Toronto, ON M5V 2K7<br />
                        Canada
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <h3 className="text-sm font-medium text-gray-800">Phone</h3>
                      <p className="mt-1">+1 (555) 123-4567</p>
                      <p className="mt-1">Mon-Fri 9am-5pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <h3 className="text-sm font-medium text-gray-800">Email</h3>
                      <p className="mt-1">info@ansarcharity.org</p>
                      <p className="mt-1">support@ansarcharity.org</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-800">Follow Us</h3>
                  <div className="mt-4 flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-primary-600">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary-600">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary-600">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary-600">
                      <span className="sr-only">YouTube</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">Our Locations</h3>
                  <div className="mt-4 bg-gray-50 rounded-md p-4">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="w-full h-64 rounded-md"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.9719257363283!2d-79.3871108!3d43.6684652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34cac364f535%3A0xd8ab0a2eef708dbb!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1651774229519!5m2!1sen!2sca"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Section */}
          <div className="lg:col-span-7">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-gray-900">Message Sent!</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Send Us a Message
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Have questions about our organization, ways to donate, or how to get involved? Fill out the form below, and we'll get back to you as soon as possible.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                      <div className="sm:col-span-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                            className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md"
                            placeholder="How can we help you?"
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <input
                              id="privacy-policy"
                              name="privacy-policy"
                              type="checkbox"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              required
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">
                              By submitting this form, you agree to our{' '}
                              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                privacy policy
                              </a>
                              {' '}and consent to us using your information to respond to your inquiry.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          {loading ? <LoadingSpinner size="sm" text="Sending..." /> : 'Send Message'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">How can I donate to your organization?</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      You can donate online through our website, by phone, or by mail. We accept various payment methods including credit cards, PayPal, and bank transfers. For larger donations or legacy giving, please contact our donor relations team.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Is my donation tax-deductible?</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Yes, we are a registered charitable organization and all donations are tax-deductible to the extent allowed by law. You will receive a tax receipt for your donation that can be used for tax purposes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">How can I volunteer with your organization?</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      We welcome volunteers for various roles and activities. Please visit our <a href="/volunteer" className="text-primary-600 hover:text-primary-500">Volunteer page</a> to learn about current opportunities and to submit an application.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Where does my donation go?</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Your donation supports our various humanitarian programs including emergency relief, water projects, education initiatives, orphan sponsorship, and mosque construction. You can choose to designate your donation to a specific cause or make a general contribution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 