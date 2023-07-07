import { createContext, useContext, useState } from "react";

export const RegisterRoleContext = createContext();

export const RegisterRoleContextProvider = ({ children }) => {
  const [role, setRole] = useState("BASIC");
  return (
    <RegisterRoleContext.Provider value={{ role, setRole }}>
      {children}
    </RegisterRoleContext.Provider>
  );
};
