"use client";
import { UserContextProvider } from "./UserContext";

const Provider = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default Provider;
