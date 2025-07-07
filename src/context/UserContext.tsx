import React, { createContext, useState, type ReactNode } from 'react';
import type { IUser } from '../types/types';

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  // Compute isAuthenticated based on whether user is null
  const isAuthenticated = user !== null;

  const value = {
    user,
    setUser,
    isAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };