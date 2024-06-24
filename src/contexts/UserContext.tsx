import React, { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from 'react';

interface UserContextData {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextData>({
  name: '',
  setName: () => {},
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  isAdmin: false,
  setIsAdmin: () => {}
});

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ name, setName, email, setEmail, password, setPassword, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
