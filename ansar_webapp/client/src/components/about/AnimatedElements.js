import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animated heading component with underline effect
export const AnimatedHeading = ({ children, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const underlineVariants = {
    hidden: {
      width: 0
    },
    visible: {
      width: '100%',
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <motion.h2
        variants={headingVariants}
        initial="hidden"
        animate={controls}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
      >
        {children}
      </motion.h2>
      <div className="relative h-1 w-full max-w-xs mx-auto">
        <motion.div
          variants={underlineVariants}
          initial="hidden"
          animate={controls}
          className="absolute left-0 right-0 h-full bg-primary-500"
        />
      </div>
    </div>
  );
};

// Staggered card container for reports
export const StaggerContainer = ({ children, className = "", delay = 0.1 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Card animation variants that can be reused
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Animation for certification timeline
export const CertificationTimeline = ({ issuedDate, expiryDate }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const lineVariants = {
    hidden: {
      scaleX: 0,
      originX: 0
    },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom * 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.3 + 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div ref={ref} className="w-full py-6">
      <div className="flex justify-between mb-2">
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate={controls}
          className="text-center text-xs font-medium text-gray-500"
        >
          Issued
        </motion.div>
        <motion.div
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate={controls}
          className="text-center text-xs font-medium text-gray-500"
        >
          Expires
        </motion.div>
      </div>
      
      <div className="relative h-2 flex items-center">
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={controls}
          className="absolute w-full h-1 bg-gray-200"
        />
        <motion.div
          custom={0}
          variants={circleVariants}
          initial="hidden"
          animate={controls}
          className="absolute left-0 w-4 h-4 rounded-full bg-primary-500 transform -translate-x-1/2"
        />
        <motion.div
          custom={1}
          variants={circleVariants}
          initial="hidden"
          animate={controls}
          className="absolute right-0 w-4 h-4 rounded-full bg-primary-500 transform translate-x-1/2"
        />
      </div>
      
      <div className="flex justify-between mt-2">
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate={controls}
          className="text-center text-xs font-bold bg-gray-100 rounded-md px-2 py-1"
        >
          {issuedDate}
        </motion.div>
        <motion.div
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate={controls}
          className="text-center text-xs font-bold bg-gray-100 rounded-md px-2 py-1"
        >
          {expiryDate}
        </motion.div>
      </div>
    </div>
  );
};

// Floating badge component for featured items
export const FloatingBadge = ({ children, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-primary-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    danger: "bg-red-500 text-white"
  };
  
  return (
    <motion.div
      initial={{ y: -5 }}
      animate={{ y: 0 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={`absolute top-4 right-4 ${colorClasses[color]} text-xs font-bold py-1 px-3 
                rounded-full shadow-lg z-10 flex items-center justify-center`}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered progress bar for download stats
export const ProgressBar = ({ value, max, label, color = "primary" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });
  
  const percent = (value / max) * 100;
  
  const colorClasses = {
    primary: "bg-primary-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500"
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${percent}%`,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
      });
    }
  }, [controls, inView, percent]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value} of {max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          initial={{ width: "0%" }}
          animate={controls}
          className={`h-2.5 rounded-full ${colorClasses[color]}`}
        ></motion.div>
      </div>
    </div>
  );
}; 