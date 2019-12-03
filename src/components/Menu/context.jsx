import React, { useState, useContext } from 'react';

const MenuContext = React.createContext(0);
const { Provider } = MenuContext;

export function MenuContextProvider({ children }) {
  const [menuShowed, setMenuShowed] = useState(false);

  return <Provider value={[menuShowed, setMenuShowed]}>{children}</Provider>;
}

export function useMenuContext() {
  const [menuShowed, setMenuShowed] = useContext(MenuContext);

  return {
    menuShowed,
    setMenuShowed,
  };
}
