import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <span className="text-8xl font-bold text-arsenal-red">4</span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block mx-4"
          >
            <Search size={80} className="text-gray-600" />
          </motion.div>
          <span className="text-8xl font-bold text-arsenal-red">4</span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Page Not Found
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 mb-8 leading-relaxed"
        >
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="flex items-center gap-2 bg-arsenal-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
          >
            <Home size={18} />
            Go Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="flex items-center gap-2 border border-gray-600 hover:border-arsenal-red text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
          >
            <ArrowLeft size={18} />
            Go Back
          </motion.button>
        </motion.div>

        {/* Contact Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400 text-sm mb-4">
            Need help or have a question?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
            className="inline-flex items-center gap-2 text-arsenal-red hover:text-red-400 transition-colors"
          >
            <Mail size={16} />
            Contact Me
          </motion.button>
        </motion.div>

        {/* Subtle background animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 -z-10 bg-gradient-to-r from-arsenal-red to-red-800 blur-3xl"
        />
      </motion.div>
    </div>
  );
};

export default NotFound;