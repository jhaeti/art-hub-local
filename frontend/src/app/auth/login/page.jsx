"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { primaryBold } from "@/app/fonts";
import styles from "./styles.module.css";
import useUserContext from "@/app/hooks/useUserContext";
import { ADD_USER } from "@/app/context/UserContext";
import useMsgContext from "@/app/hooks/useMsgContext";
import { ERROR } from "@/app/context/MsgContext";

const login = () => {
  const router = useRouter();
  const { dispatch } = useUserContext();
  const { dispatch: msgDispatch } = useMsgContext();

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
      if (res.ok) {
        dispatch({ type: ADD_USER, user: data.user, token: data.token });
        router.push("/#arts");
      } else {
        msgDispatch({ type: ERROR, payload: data });
      }
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
