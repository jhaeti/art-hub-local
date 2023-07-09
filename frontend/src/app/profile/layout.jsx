"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.css";

import Aside from "./components/Aside";
import Menu from "./components/Menu";
import useUserContext from "@/hooks/useUserContext";

const layout = ({ children }) => {
  const {
    state: { isAuthenticated },
  } = useUserContext();
  const router = useRouter();
  useLayoutEffect(() => {
    !isAuthenticated && router.push("/profile/orders");
  }, []);
  return (
    <div className="cover_screen safe_area container">
      <div className={styles.content}>
        <div className={styles.right}>
          <Menu />
          {children}
        </div>

        <Aside />
      </div>
    </div>
  );
};

export default layout;
