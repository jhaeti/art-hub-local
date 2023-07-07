"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { primaryBold } from "@/app/fonts";
import styles from "./styles.module.css";
import useUserContext from "@/hooks/useUserContext";
import { ADD_USER } from "@/context/UserContext";

const login = () => {
  const router = useRouter();
  const { dispatch } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    (async function postData() {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/users/login",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      dispatch({ type: ADD_USER, user: data.user, token: data.token });
      router.push("/");
    })();
  }
  return (
    <div className={styles.login_box}>
      <h2 className={primaryBold.className + " " + styles.heading_secondary}>
        Login
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_control}>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="text"
            id="email"
            className={styles.form_input}
            required
          />
          <label htmlFor="email" className={styles.form_input_label}>
            Email
          </label>
        </div>
        <div className={styles.form_control}>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            id="password"
            className={styles.form_input}
            required
          />
          <label htmlFor="password" className={styles.form_input_label}>
            Password
          </label>
        </div>

        <p className={styles.redirect}>
          Don't have and account? <Link href="/auth/join">Register</Link>{" "}
        </p>

        <button className={styles.submit + " " + primaryBold.className}>
          Login
        </button>
      </form>
    </div>
  );
};

export default login;
