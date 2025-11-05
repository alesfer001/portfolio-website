import { useState } from 'react';
import { useForm } from '@formspree/react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { trackContactFormStart, trackContactFormSubmit } from '../utils/analytics';

const Contact = () => {
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'mnnoepae';
  const [state, handleFormspreeSubmit] = useForm(formspreeId);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value) => {
    const errors = { ...validationErrors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      }
      case 'message':
        if (!value.trim()) {
          errors.message = 'Message is required';
        } else if (value.trim().length < 10) {
          errors.message = 'Message must be at least 10 characters';
        } else {
          delete errors.message;
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Track form start on first input
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackContactFormStart();
    }

    setFormData({
      ...formData,
      [name]: value
    });

    // Validate field in real-time if user has started typing
    if (value.trim() || validationErrors[name]) {
      validateField(name, value);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isMessageValid = validateField('message', formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    // Track conversion
    trackContactFormSubmit(formData);

    // Submit to Formspree
    await handleFormspreeSubmit(e);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'lesferayoub@gmail.com',
      link: 'mailto:lesferayoub@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      content: '+33 7 62 05 59 15',
      link: 'tel:+33762055915'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      content: 'Based in Bordeaux, France (CET/CEST)',
      link: null
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="text-arsenal-red">Touch</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Available for freelance projects worldwide. Let&apos;s discuss how we can work together
            to create something amazing for your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Let&apos;s Start a Conversation
              </h3>
              <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                🌍 Available for remote work worldwide
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-arsenal-red p-3 rounded-lg">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-300 hover:text-arsenal-red transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-300">{info.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold mb-4 text-arsenal-red">
                Freelance Services
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Full-stack web development (PHP, NodeJS, React, VueJS)</li>
                <li>• E-commerce platform development & optimization</li>
                <li>• Legacy system modernization & migration</li>
                <li>• API development & third-party integrations</li>
                <li>• Blockchain & DeFi applications</li>
                <li>• Technical consulting & code reviews</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {state.succeeded ? (
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-8 text-center">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-300 mb-4">
                  Your message has been sent successfully. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="px-6 py-2 bg-arsenal-red hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {state.errors && state.errors.length > 0 && (
                  <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-500 font-semibold mb-1">Submission Error</h4>
                      <p className="text-gray-300 text-sm">
                        There was a problem submitting your form. Please try again.
                      </p>
                    </div>
                  </div>
                )}

                {Object.keys(validationErrors).length > 0 && (
                  <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-500 font-semibold mb-1">Validation Errors</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {Object.entries(validationErrors).map(([field, error]) => (
                          <li key={field}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-arsenal-red focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-arsenal-red focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-white font-semibold mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-arsenal-red focus:outline-none transition-colors"
                  placeholder="Your company or organization (optional)"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-white font-semibold mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-arsenal-red focus:outline-none transition-colors"
                  >
                    <option value="">Select project type</option>
                    <option value="Web Development">Web Development</option>
                    <option value="E-commerce Platform">E-commerce Platform</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Blockchain/DeFi">Blockchain/DeFi</option>
                    <option value="API Integration">API Integration</option>
                    <option value="Legacy System Migration">Legacy System Migration</option>
                    <option value="Technical Consulting">Technical Consulting</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-white font-semibold mb-2">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-arsenal-red focus:outline-none transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="€5k-15k">€5k-15k</option>
                    <option value="€15k-30k">€15k-30k</option>
                    <option value="€30k-50k">€30k-50k</option>
                    <option value="€50k+">€50k+</option>
                    <option value="Let's Discuss">Let&apos;s Discuss</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-white font-semibold mb-2">
                  Timeline *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-arsenal-red focus:outline-none transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-arsenal-red focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project requirements, goals, and any specific technologies or features you need..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={state.submitting}
                whileHover={{ scale: state.submitting ? 1 : 1.02 }}
                whileTap={{ scale: state.submitting ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  state.submitting
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-arsenal-red hover:bg-red-700 text-white'
                }`}
              >
                {state.submitting ? (
                  <>
                    <Send size={20} className="animate-pulse" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
