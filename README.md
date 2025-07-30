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

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically detect Vite configuration
3. Deploy with zero configuration

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/portfolio-website"`
3. Add deploy script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

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