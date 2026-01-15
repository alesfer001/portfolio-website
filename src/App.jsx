import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import { Hero } from './components/hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ErrorBoundary from './components/ErrorBoundary';
import { CursorProvider, CustomCursor } from './components/cursor';

function App() {
  // Initialize smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Make lenis available globally for scroll-to functionality
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <CursorProvider>
      <ErrorBoundary fallbackMessage="Sorry, something went wrong with the portfolio website. Please try refreshing the page.">
        <div className="min-h-screen bg-surface-primary text-white">
          {/* Custom cursor */}
          <CustomCursor />

          <ErrorBoundary fallbackMessage="There was an issue loading the navigation. Please refresh the page.">
            <Header />
          </ErrorBoundary>
          <main>
            <ErrorBoundary fallbackMessage="There was an issue loading the hero section.">
              <Hero />
            </ErrorBoundary>
            <ErrorBoundary fallbackMessage="There was an issue loading the about section.">
              <About />
            </ErrorBoundary>
            <ErrorBoundary fallbackMessage="There was an issue loading the timeline section.">
              <Timeline />
            </ErrorBoundary>
            <ErrorBoundary fallbackMessage="There was an issue loading the skills section.">
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary fallbackMessage="There was an issue loading the projects section.">
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary fallbackMessage="There was an issue loading the testimonials section.">
              <Testimonials />
            </ErrorBoundary>
            <ErrorBoundary fallbackMessage="There was an issue loading the contact section.">
              <Contact />
            </ErrorBoundary>
          </main>
          <ErrorBoundary fallbackMessage="There was an issue loading the footer.">
            <Footer />
          </ErrorBoundary>
          <FloatingActions />
        </div>
      </ErrorBoundary>
    </CursorProvider>
  );
}

export default App;
