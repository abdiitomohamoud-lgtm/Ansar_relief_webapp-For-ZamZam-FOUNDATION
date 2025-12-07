import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const StatisticCard = ({ icon, number, label, suffix = "+", duration = 1, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px 0px" });
  
  useEffect(() => {
    if (isInView) {
      let startTime;
      const finalNumber = parseInt(number.replace(/,/g, ''));
      
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * finalNumber);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(finalNumber);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, number, duration]);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-primary-800 p-6 rounded-xl shadow-lg text-center"
    >
      <div className="rounded-full bg-primary-700 w-16 h-16 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      
      <div className="text-4xl font-bold mb-2 flex items-center justify-center">
        <div>
          {count.toLocaleString()}
          <span>{suffix}</span>
        </div>
      </div>
      
      <p className="text-primary-100">{label}</p>
    </motion.div>
  );
};

export default StatisticCard; 