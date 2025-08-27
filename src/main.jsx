import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initGA, hasAnalyticsConsent } from './utils/analytics.js'

// Initialize analytics if consent is given
if (hasAnalyticsConsent()) {
  initGA();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)