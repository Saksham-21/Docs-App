import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <AppContext.Provider value={{ reloadKey, setReloadKey }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);