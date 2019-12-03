import React, { useState, useContext } from 'react';

const CurrentImageContext = React.createContext(0);
const { Provider } = CurrentImageContext;

export function CurrentImageContextProvider({ children }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Provider value={[currentImageIndex, setCurrentImageIndex]}>
      {children}
    </Provider>
  );
}

export function useCurrentImageContext() {
  const [currentImageIndex, setCurrentImageIndex] = useContext(
    CurrentImageContext
  );

  return {
    currentImageIndex,
    setCurrentImageIndex,
  };
}
