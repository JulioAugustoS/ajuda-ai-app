import React, { useState, createContext, useContext } from "react";

export type AuthContextType = {
  isAuth: boolean;
  user: any;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({} as any);

  const value = {
    isAuth,
    user,
    setIsAuth,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export { AuthProvider, useAuth };
