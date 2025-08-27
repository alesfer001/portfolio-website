# Ayoub Lesfer - Portfolio Website

A modern, responsive portfolio website showcasing my skills and projects as a Senior Full-Stack Developer. Built with React, Tailwind CSS, and Framer Motion for smooth animations.

## 🚀 Features

- **Modern Design**: Clean, professional layout with dark theme and Arsenal red accents
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Powered by Framer Motion for engaging user interactions
- **Performance Optimized**: Built with Vite for fast development and optimized builds
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful icon set

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting
- **PostCSS** - CSS processing with Tailwind

## 📁 Project Structure

```
portfolio-website/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── assets/
│   ├── hooks/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Background**: `#111827` (gray-900)
- **Secondary Background**: `#1F2937` (gray-800)
- **Accent Color**: `#DB0007` (Arsenal Red)
- **Text Primary**: `#FFFFFF` (white)
- **Text Secondary**: `#D1D5DB` (gray-300)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📱 Sections

### 1. Header
- Fixed navigation with smooth scroll
- Mobile-responsive hamburger menu
- Logo with hover animations

### 2. Hero
- Eye-catching introduction
- Call-to-action buttons
- Social media links
- Animated scroll indicator

### 3. About
- Professional overview
- Key highlights with icons
- Availability status badges

### 4. Skills
- Categorized skill sets (Frontend, Backend, Tools)
- Animated progress bars
- Additional technologies showcase

### 5. Projects
- Featured project portfolio
- Project descriptions and tech stacks
- Live demo and source code links
- Responsive project cards

### 6. Contact
- Contact form with validation
- Contact information
- Service offerings
- Form submission feedback

### 7. Footer
- Quick navigation links
- Social media links
- Copyright information
- Back to top functionality

## 🎯 Customization

### Personal Information
Update the following files with your information:
- `src/components/Hero.jsx` - Name, title, description
- `src/components/About.jsx` - Professional background
- `src/components/Skills.jsx` - Your skill sets and levels
- `src/components/Projects.jsx` - Your project portfolio
- `src/components/Contact.jsx` - Contact information
- `index.html` - Page title and meta description

### Styling
- Modify `tailwind.config.js` to change colors, fonts, or add custom styles
- Update `src/index.css` for global styles
- Customize component styles in individual component files

### Content
- Replace placeholder project images
- Update social media links
- Modify contact form handling
- Add your actual project URLs

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Vite and tree shaking
- **Images**: Lazy loading and responsive images
- **Animations**: Optimized with Framer Motion

## 🌐 Deployment

This portfolio is optimized for deployment on modern hosting platforms with built-in support for performance and SEO.

### 🚀 Quick Deploy to Vercel (Recommended)

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio-website)

**Manual Deployment:**

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```
   
   Required variables:
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_CONTACT_FORM_ACTION=https://formspree.io/f/your-form-id
   VITE_SITE_URL=https://yourdomain.com
   ```

3. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

4. **Configure Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add all environment variables from your `.env.local`
   - Redeploy to apply changes

### 🎯 Alternative Deployment Options

#### Netlify
```bash
# Build locally
npm run build

# Deploy to Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Netlify Configuration:** Create `netlify.toml`
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

#### AWS S3 + CloudFront
```bash
# Build for production
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## ⚙️ Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 tracking ID | `G-XXXXXXXXXX` |
| `VITE_SITE_URL` | Your website URL | `https://ayoublesfer.dev` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_CONTACT_FORM_ACTION` | Contact form endpoint | `https://formspree.io/f/abc123` |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | `service_abc123` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | `template_abc123` |
| `VITE_EMAILJS_USER_ID` | EmailJS public key | `user_abc123` |
| `VITE_GITHUB_URL` | Your GitHub profile | `https://github.com/username` |
| `VITE_LINKEDIN_URL` | Your LinkedIn profile | `https://linkedin.com/in/username` |
| `VITE_TWITTER_URL` | Your Twitter profile | `https://twitter.com/username` |
| `VITE_RESUME_URL` | Link to your resume | `https://example.com/resume.pdf` |

### Environment Configuration

1. **Development**: Copy `.env.example` to `.env.local`
2. **Production**: Set variables in your hosting platform dashboard
3. **Staging**: Use `.env.staging` (create as needed)

**Security Note**: Never commit actual environment variables to git. Use the `.env.example` file as a template.

## 📋 Content Management

### Updating Projects

Edit `src/components/Projects.jsx`:

```javascript
const projects = [
  {
    title: 'Your Project Name',
    description: 'Project description...',
    technologies: ['React', 'Node.js', 'MongoDB'],
    featured: true, // Set to true for featured projects
    date: 'Jan 2024 - Present',
    status: 'Current', // Current, Ongoing, Completed
    highlight: 'Key achievement or feature'
  }
];
```

### Updating Skills

Edit `src/components/Skills.jsx`:

```javascript
const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 90 }, // Level 1-100
      { name: 'TypeScript', level: 85 }
    ]
  }
];
```

### Updating Contact Information

Edit `src/components/Contact.jsx` and update:
- Email address
- Phone number  
- Location
- Social media links

### Adding New Sections

1. Create new component in `src/components/`
2. Import and add to `src/App.jsx`
3. Add navigation link in `src/components/Header.jsx`
4. Update smooth scroll functionality

## 🔧 Maintenance Checklist

### Monthly Tasks
- [ ] Update project portfolio with new work
- [ ] Review and update skill levels
- [ ] Check all external links are working
- [ ] Update availability status
- [ ] Review and respond to contact form submissions

### Quarterly Tasks  
- [ ] Update dependencies (`npm audit` and `npm update`)
- [ ] Review and optimize performance (Lighthouse audit)
- [ ] Update resume/CV link
- [ ] Refresh project screenshots
- [ ] Review and update meta descriptions for SEO

### Annual Tasks
- [ ] Review and update professional summary
- [ ] Update copyright year in footer
- [ ] Review hosting costs and alternatives
- [ ] Backup project data and configurations
- [ ] Review analytics and user feedback

### Performance Monitoring
- Use Google PageSpeed Insights monthly
- Monitor Core Web Vitals
- Check mobile responsiveness
- Validate HTML and CSS
- Test cross-browser compatibility

### Security Updates
- Keep dependencies up to date
- Monitor security advisories
- Use `npm audit fix` for security patches
- Review environment variables regularly

## 🚨 Troubleshooting

### Common Issues

**Build fails with "out of memory" error:**
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

**Images not loading in production:**
- Check image paths are relative
- Ensure images are in `public/` folder
- Use `import` for images in `src/assets/`

**Contact form not working:**
- Verify environment variables are set
- Check form action URL is correct
- Test with form service (Formspree, Netlify Forms)

**Analytics not tracking:**
- Verify Google Analytics ID is correct
- Check cookie consent is enabled
- Test in incognito/private mode

### Performance Issues

**Large bundle size:**
```bash
npm run build:analyze
```
- Use dynamic imports for heavy components
- Optimize images (WebP format)
- Remove unused dependencies

**Slow loading:**
- Enable gzip compression on server
- Use CDN for static assets
- Implement service worker for caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Ayoub Lesfer**
- Email: lesferayoub@gmail.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- GitHub: [Your GitHub Profile](https://github.com/yourusername)

---

⭐ **Star this repository if you found it helpful!**