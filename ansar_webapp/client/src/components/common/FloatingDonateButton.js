import React, { useState, useEffect, useRef } from 'react';
import { useDonation } from '../../contexts/DonationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHandHoldingHeart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import QuickDonatePanel from '../donate/QuickDonatePanel';

const FloatingDonateButton = () => {
  const { isQuickDonateOpen, closeQuickDonate } = useDonation();
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPanel(false);
        closeQuickDonate();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeQuickDonate]);

  // Open panel automatically if context says so
  useEffect(() => {
    if (isQuickDonateOpen) setShowPanel(true);
  }, [isQuickDonateOpen]);
  
  // Direct navigation to the donate page
  const navigateToDonate = () => {
    navigate('/donate');
    setShowPanel(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-24 bottom-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-100 w-[600px] overflow-hidden z-[999]"
            style={{
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2), 0 15px 20px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              height: "calc(100vh - 120px)"
            }}
            data-testid="quick-donate-panel"
          >
            <div className="h-full overflow-y-auto">
              <QuickDonatePanel 
                onClose={() => { setShowPanel(false); closeQuickDonate(); }} 
                navigateToDonate={navigateToDonate} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse effect */}
        {!showPanel && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-500/40"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop"
            }}
            aria-hidden="true"
          />
        )}
        <motion.button
          onClick={() => setShowPanel(!showPanel)}
          className={`${showPanel 
            ? 'bg-gradient-to-r from-red-500 to-red-600' 
            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
          } text-white rounded-full py-2.5 px-5 shadow-lg flex items-center gap-2 transition-all duration-300 font-medium relative z-10`}
          style={{
            boxShadow: "0 10px 20px -4px rgba(46, 101, 203, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
          }}
          aria-label={showPanel ? "Close donation panel" : "Open donation panel"}
          aria-expanded={showPanel}
          data-testid="floating-donate-button"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={showPanel ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full"
          >
            {showPanel ? (
              <FaTimes className="text-white" aria-hidden="true" />
            ) : (
              <FaHandHoldingHeart className="text-white" aria-hidden="true" />
            )}
          </motion.div>
          <span className="font-medium tracking-wide whitespace-nowrap text-sm">
            {showPanel ? 'Close Donation' : 'Donate Now'}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FloatingDonateButton; 