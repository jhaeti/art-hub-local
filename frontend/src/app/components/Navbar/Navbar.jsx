"use client";
import Image from "next/image";
import { useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import * as fonts from "../../fonts";
import styles from "./styels.module.css";
import useUserContext from "@/hooks/useUserContext";
import { REMOVE_USER } from "@/context/UserContext";
import apiUrl from "@/app/utils/apiUrl";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    state: { isAuthenticated, token },
    dispatch,
  } = useUserContext();

  function logout() {
    fetch(apiUrl + "/users/logout", {
      credentials: "include",
    }).then(() => {
      dispatch({ type: REMOVE_USER });
      router.push("/auth/login");
    });
  }
  return (
    <nav className={styles.nav}>
      <div className={"container" + " " + styles.container}>
        <Link href="/">
          <Image
            src={
              pathname === "/" || pathname.startsWith("/auth")
                ? "/logo.svg"
                : "/logo_dark.svg"
            }
            width={94}
            height={54}
          />
        </Link>
        <ul>
          <li>
            <Link
              style={{
                color:
                  pathname === "/" || pathname.startsWith("/auth")
                    ? "var(--color-white)"
                    : "var(--color-dard)",
              }}
              href={isAuthenticated ? "/profile" : "/auth/login"}
            >
              {isAuthenticated ? "Profile" : "Login"}
            </Link>
          </li>
          <li className={styles.join}>
            <button
              onClick={() => {
                isAuthenticated ? logout() : router.push("/auth/join");
              }}
              className={fonts.primaryBold.className + " " + styles.btn}
            >
              {isAuthenticated ? "Logout" : "Join"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
