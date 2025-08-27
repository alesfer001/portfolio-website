// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize GA4
export const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href
    });
  }
};

// Track page views
export const trackPageView = (page_title, page_location) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_title,
    page_location
  });
};

// Track custom events
export const trackEvent = (action, category = 'engagement', label = '', value = 0) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

// Specific tracking functions for portfolio interactions
export const trackProjectInterest = (projectName, action = 'click') => {
  trackEvent(action, 'project_engagement', projectName, 1);
};

export const trackContactFormStart = () => {
  trackEvent('form_start', 'contact_form', 'contact_form_engagement');
};

export const trackContactFormSubmit = (formData) => {
  trackEvent('form_submit', 'contact_form', 'contact_form_conversion', 1);
  
  // Track additional conversion data (without PII)
  gtag('event', 'generate_lead', {
    currency: 'USD',
    value: 1,
    project_type: formData.projectType || 'unknown',
    budget_range: formData.budget || 'unknown',
    timeline: formData.timeline || 'unknown'
  });
};

export const trackSkillsView = () => {
  trackEvent('skills_view', 'content_engagement', 'skills_section');
};

export const trackResumeDownload = () => {
  trackEvent('resume_download', 'file_download', 'resume_pdf', 1);
};

export const trackSocialClick = (platform) => {
  trackEvent('social_click', 'social_engagement', platform);
};

// Privacy-compliant tracking
export const enableAnalytics = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('analytics_consent', 'true');
    initGA();
  }
};

export const disableAnalytics = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('analytics_consent', 'false');
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  }
};

export const hasAnalyticsConsent = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('analytics_consent') === 'true';
  }
  return false;
};