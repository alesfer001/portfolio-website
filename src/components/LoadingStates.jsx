import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export const SkillSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-700 rounded mb-2 w-3/4"></div>
    <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
      <div className="h-2.5 bg-gray-600 rounded-full w-1/2"></div>
    </div>
  </div>
);

export const ProjectSkeleton = () => (
  <motion.div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 animate-pulse">
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="aspect-video bg-gray-700"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/5"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-700 rounded w-16"></div>
          <div className="h-6 bg-gray-700 rounded w-20"></div>
          <div className="h-6 bg-gray-700 rounded w-18"></div>
        </div>
        <div className="flex gap-4 pt-2">
          <div className="h-10 bg-gray-700 rounded w-32"></div>
          <div className="h-10 bg-gray-700 rounded w-28"></div>
        </div>
      </div>
    </div>
  </motion.div>
);

export const ContactFormSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="h-12 bg-gray-700 rounded"></div>
      <div className="h-12 bg-gray-700 rounded"></div>
    </div>
    <div className="h-12 bg-gray-700 rounded"></div>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="h-12 bg-gray-700 rounded"></div>
      <div className="h-12 bg-gray-700 rounded"></div>
      <div className="h-12 bg-gray-700 rounded"></div>
    </div>
    <div className="h-32 bg-gray-700 rounded"></div>
    <div className="h-12 bg-gray-700 rounded w-32"></div>
  </div>
);

export const SkillCategorySkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-700 rounded mb-6 w-1/3"></div>
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <SkillSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} border-2 border-arsenal-red border-t-transparent rounded-full`}
    />
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])
};

export const PageLoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-900 animate-pulse">
    {/* Header Skeleton */}
    <div className="h-16 bg-gray-800 border-b border-gray-700 mb-8"></div>
    
    {/* Hero Section Skeleton */}
    <div className="container-custom py-20">
      <div className="text-center space-y-6">
        <div className="h-12 bg-gray-700 rounded mx-auto w-3/4"></div>
        <div className="h-6 bg-gray-700 rounded mx-auto w-1/2"></div>
        <div className="h-12 bg-gray-700 rounded mx-auto w-32"></div>
      </div>
    </div>

    {/* Content Sections Skeleton */}
    <div className="space-y-16">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="container-custom py-16">
          <div className="h-8 bg-gray-700 rounded mb-8 w-1/4"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, j) => (
              <div key={j} className="h-32 bg-gray-800 rounded border border-gray-700"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ButtonLoadingState = ({ children, isLoading, ...props }) => (
  <button {...props} disabled={isLoading}>
    <div className="flex items-center gap-2">
      {isLoading && <LoadingSpinner size="sm" />}
      {children}
    </div>
  </button>
);

ButtonLoadingState.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export const FormSubmitButton = ({ isSubmitting, children, ...props }) => (
  <motion.button
    {...props}
    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
    disabled={isSubmitting}
    className={`${props.className} ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
  >
    <div className="flex items-center gap-2">
      {isSubmitting && <LoadingSpinner size="sm" />}
      {children}
    </div>
  </motion.button>
);

FormSubmitButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};