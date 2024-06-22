import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chatarea, setChatarea] = useState(false);
  return (
    <AppContext.Provider value={{ reloadKey, setReloadKey ,loading, setLoading,chatarea, setChatarea}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);