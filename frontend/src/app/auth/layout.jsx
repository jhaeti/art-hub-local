"use client";
import styles from "./styles.module.css";
import { secondary } from "../fonts";
import { RegisterRoleContextProvider } from "@/app/context/RegisterRoleContext";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <div className={styles.children}>
          <RegisterRoleContextProvider>{children}</RegisterRoleContextProvider>
        </div>
        <div className={styles.footer + " " + secondary.className}>
          © 2023 ART HUB LOCAL WEBSITE
        </div>
      </div>
      <div className={styles.right_bg}></div>
    </div>
  );
};

export default AuthLayout;
