import React, { createContext, useContext, useState, useEffect } from "react";
import data from "../data/Data.json";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const [userEmail, setUserEmail] = useState(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    return storedUserEmail ? JSON.parse(storedUserEmail) : "";
  });

  useEffect(() => {
    localStorage.setItem("userEmail", JSON.stringify(userEmail));
  }, [userEmail]);

  const contextValue: AuthContextProps = {
    isAuthenticated,
    setIsAuthenticated,
    userEmail,
  };

  useEffect(() => {
    const storedData = localStorage.getItem("Data");
    if (!storedData) {
      localStorage.setItem("Data", JSON.stringify(data));
      setUserEmail(data.email);
    }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
