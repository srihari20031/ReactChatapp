import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/Firebase.config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentuser, setCurrentUser] = useState({});

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
     
    });
    return () => unSub();
  }, []);

  return (
    <AuthContext.Provider value={{ currentuser }}>
      {children}
    </AuthContext.Provider>
  );
};
