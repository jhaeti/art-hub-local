"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as fonts from "../../fonts";
import styles from "./styels.module.css";
import useUserContext from "@/hooks/useUserContext";

const Navbar = () => {
  const router = useRouter();
  const {
    state: { isAuthenticated },
  } = useUserContext();
  return (
    <nav className={styles.nav}>
      <div className={"container" + " " + styles.container}>
        <Link href="/">
          <Image src="/logo.svg" width={94} height={54} />
        </Link>
        <ul>
          <li>
            <Link href={isAuthenticated ? "/profile" : "/auth/login"}>
              {isAuthenticated ? "Profile" : "Login"}
            </Link>
          </li>
          <li className={styles.join}>
            <button
              onClick={() => {
                isAuthenticated
                  ? console.log("Logout")
                  : router.push("/auth/join");
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
