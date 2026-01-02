import React, { createContext, useState, useContext } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('yearly'); // 'monthly' or 'yearly'

  const subscribe = () => {
    setIsSubscribed(true);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        selectedPlan,
        setSelectedPlan,
        subscribe,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
