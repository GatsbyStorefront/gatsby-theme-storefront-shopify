import React, { useState, useContext } from 'react';

const SearchContext = React.createContext(0);
const { Provider } = SearchContext;

export function SearchContextProvider({ children }) {
  const [searchShowed, setSearchShowed] = useState(false);

  return (
    <Provider value={[searchShowed, setSearchShowed]}>{children}</Provider>
  );
}

export function useSearchContext() {
  const [searchShowed, setSearchShowed] = useContext(SearchContext);

  return {
    searchShowed,
    setSearchShowed,
  };
}
