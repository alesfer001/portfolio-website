import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary fallbackMessage="Sorry, something went wrong with the portfolio website. Please try refreshing the page.">
      <div className="min-h-screen bg-gray-900 text-white">
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
          <ErrorBoundary fallbackMessage="There was an issue loading the skills section.">
            <Skills />
          </ErrorBoundary>
          <ErrorBoundary fallbackMessage="There was an issue loading the projects section.">
            <Projects />
          </ErrorBoundary>
          <ErrorBoundary fallbackMessage="There was an issue loading the contact section.">
            <Contact />
          </ErrorBoundary>
        </main>
        <ErrorBoundary fallbackMessage="There was an issue loading the footer.">
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default App;