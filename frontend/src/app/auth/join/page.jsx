"use client";
import { useRouter } from "next/navigation";

import { primaryBold } from "@/app/fonts";
import styles from "./styles.module.css";

const page = () => {
  const router = useRouter();

  return (
    <>
      <h2 className={primaryBold.className + " " + styles.heading_secondary}>
        Register
      </h2>
      <h2 className={primaryBold.className + " " + styles.heading_tertiary}>
        What are you here for?
      </h2>
      <div className={styles.btn_box}>
        <div className={styles.btn}>
          <button
            className={styles.link}
            onClick={() => router.push("/auth/register")}
          >
            I am here to purchase
          </button>
          <span></span>
        </div>
      </div>

      <div className={styles.btn_box}>
        <div className={styles.btn}>
          <button
            className={styles.link}
            onClick={() => router.push("/auth/register")}
          >
            I want to advertise my arts
          </button>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default page;
