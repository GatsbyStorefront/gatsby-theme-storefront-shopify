import React, { useState, useContext } from 'react';

const CurrentVariantContext = React.createContext();
const { Provider } = CurrentVariantContext;

export function CurrentVariantContextProvider({ children }) {
  const [currentVariant, setCurrentVariant] = useState();

  return (
    <Provider value={[currentVariant, setCurrentVariant]}>{children}</Provider>
  );
}

export function useCurrentVariantContext() {
  const [currentVariant, setCurrentVariant] = useContext(CurrentVariantContext);

  return {
    currentVariant,
    setCurrentVariant,
  };
}
