import React, { createContext, useContext, useState } from 'react';

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [urgentNeed, setUrgentNeed] = useState(null); // urgent need card data
  const [isQuickDonateOpen, setQuickDonateOpen] = useState(false); // controls QuickDonatePanel visibility

  // Call this to trigger the panel with urgent need data
  const openQuickDonateWithUrgentNeed = (cardData) => {
    setUrgentNeed(cardData);
    setQuickDonateOpen(true);
  };

  // Call this to close and clear urgent need data
  const closeQuickDonate = () => {
    setUrgentNeed(null);
    setQuickDonateOpen(false);
  };

  return (
    <DonationContext.Provider value={{ urgentNeed, isQuickDonateOpen, openQuickDonateWithUrgentNeed, closeQuickDonate }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) throw new Error('useDonation must be used within a DonationProvider');
  return context;
};
