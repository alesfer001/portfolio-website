import { useState } from 'react';
import { useForm } from '@formspree/react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { trackContactFormStart, trackContactFormSubmit } from '../utils/analytics';
import { useCursor } from './cursor';
import { SplitFlap, useInViewOnce } from './flap';

const Contact = () => {
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'mnnoepae';
  const [state, handleFormspreeSubmit] = useForm(formspreeId);
  const { setCursorVariant } = useCursor();
  const [boardRef, boardSeen] = useInViewOnce();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
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

    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackContactFormStart();
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (value.trim() || validationErrors[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isMessageValid = validateField('message', formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    trackContactFormSubmit(formData);
    await handleFormspreeSubmit(e);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'lesferayoub@gmail.com',
      link: 'mailto:lesferayoub@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+33 7 62 05 59 15',
      link: 'tel:+33762055915',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Bordeaux, France (CET)',
      link: null,
    },
  ];

  return (
    <section id="contact" ref={boardRef} className="py-24 sm:py-32">
      <div className="bleed">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule-strong pb-6">
          <SplitFlap
            text="NOW BOARDING"
            active={boardSeen}
            className="text-[9vw] leading-none sm:text-[6vw] lg:text-[4.6vw]"
          />
          <p className="mono-label max-w-[30ch] leading-relaxed">
            Tell me what you are building
            <br />
            Replies within one working day
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="mono-data mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-ash">
              <span className="lamp lamp--on" />
              Available worldwide
            </div>

            {/* Contact Items */}
            <div className="mb-10">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="group grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-4 border-b border-rule py-4"
                >
                  <span className="mono-label">{info.title}</span>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="inline-flex items-center gap-1.5 font-mono-data text-sm text-bone transition-colors hover:text-amber"
                    >
                      {info.content}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  ) : (
                    <span className="font-mono-data text-sm text-bone">{info.content}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Services */}
            <h3 className="mono-label">Services offered</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                'Full-stack web development',
                'E-commerce platforms',
                'Legacy system modernisation',
                'API development & integrations',
                'Blockchain & DeFi applications',
              ].map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="h-px w-4 bg-[var(--amber)]" />
                  <span className="font-mono-data text-xs uppercase tracking-wider text-ash">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {state.succeeded ? (
              <div className="card p-8 text-center border-green-500/30">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-400 mb-6">
                  Your message has been sent successfully. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-6">
                {state.errors && state.errors.length > 0 && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-400 font-medium">Submission Error</p>
                      <p className="text-gray-400 text-sm">Please try again.</p>
                    </div>
                  </div>
                )}

                {Object.keys(validationErrors).length > 0 && (
                  <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 font-medium">Please fix the errors</p>
                      <ul className="text-gray-400 text-sm">
                        {Object.values(validationErrors).map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your company (optional)"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select type</option>
                      <option value="Web Development">Web Development</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Blockchain">Blockchain</option>
                      <option value="API Integration">API Integration</option>
                      <option value="Consulting">Consulting</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Budget *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select budget</option>
                      <option value="€5k-15k">€5k-15k</option>
                      <option value="€15k-30k">€15k-30k</option>
                      <option value="€30k-50k">€30k-50k</option>
                      <option value="€50k+">€50k+</option>
                      <option value="Discuss">Let&apos;s Discuss</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                      Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell me about your project requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{ scale: state.submitting ? 1 : 1.02 }}
                  whileTap={{ scale: state.submitting ? 1 : 0.98 }}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className={`w-full btn-primary flex items-center justify-center gap-2 ${
                    state.submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {state.submitting ? (
                    <>
                      <Send size={18} className="animate-pulse" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
