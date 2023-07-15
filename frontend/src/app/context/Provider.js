"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { UserContextProvider } from "./UserContext";
import { MsgContextProvider } from "./MsgContext";

const Provider = ({ children }) => {
  return (
    <MsgContextProvider>
      <UserContextProvider>
        <ProgressBar
          height="4px"
          color="#00ff00"
          options={{ showSpinner: false }}
          // shallowRouting
        />
        {children}
      </UserContextProvider>
    </MsgContextProvider>
  );
};

export default Provider;
