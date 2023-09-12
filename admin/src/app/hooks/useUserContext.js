import { useContext } from "react";

import { UserContext } from "../context/UserContext";

const useUserContext = () => {
  const value = useContext(UserContext);
  return value;
};

export default useUserContext;
