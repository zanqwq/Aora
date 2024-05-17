import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      setIsLoading,
      user,
      setUser,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
