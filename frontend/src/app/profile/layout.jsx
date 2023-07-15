"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

import styles from "./styles.module.css";
import Aside from "./components/Aside";
import Menu from "./components/Menu";
import apiUrl from "../utils/apiUrl";
import useUserContext from "@/app/hooks/useUserContext";

const layout = ({ children }) => {
  const router = useRouter();
  const { state } = useUserContext();
  useLayoutEffect(() => {
    (async function getSelf() {
      const res = await fetch(apiUrl + "/users/me", {
        credentials: "include",
      });

      !res.ok && router.push("/");
    })();
  }, []);

  return (
    state.isAuthenticated && (
      <div className="cover_screen safe_area container">
        <div className={styles.content}>
          <div className={styles.right}>
            <Menu />
            {children}
          </div>

          <Aside />
        </div>
      </div>
    )
  );
};

export default layout;
