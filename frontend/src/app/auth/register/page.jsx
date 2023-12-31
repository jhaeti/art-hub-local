"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";

import { primaryBold } from "@/app/fonts";
import styles from "./styles.module.css";
import { RegisterRoleContext } from "@/app/context/RegisterRoleContext";
import useUserContext from "@/app/hooks/useUserContext";
import { ADD_USER } from "@/app/context/UserContext";
import useMsgContext from "@/app/hooks/useMsgContext";
import { ERROR } from "@/app/context/MsgContext";

const register = () => {
  const router = useRouter();
  const { dispatch } = useUserContext();
  const { role } = useContext(RegisterRoleContext);
  const { dispatch: msgDispatch } = useMsgContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [momo, setMomo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    (async function postData() {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/users/register",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role, momo }),
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
    <div className={styles.register_box}>
      <h2 className={primaryBold.className + " " + styles.heading_secondary}>
        Register
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_control}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className={styles.form_input}
            required
          />
          <label htmlFor="name" className={styles.form_input_label}>
            Your name
          </label>
        </div>
        <div className={styles.form_control}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className={styles.form_input}
            required
          />
          <label htmlFor="password" className={styles.form_input_label}>
            Password
          </label>
        </div>
        <div className={styles.form_control}>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="confirm-password"
            className={styles.form_input}
            required
          />
          <label htmlFor="confirm-password" className={styles.form_input_label}>
            Confirm Password
          </label>
        </div>
        <div className={styles.form_control}>
          <input
            value={momo}
            onChange={(e) => setMomo(e.target.value)}
            type="text"
            id="momo"
            className={styles.form_input}
            required
          />
          <label htmlFor="momo" className={styles.form_input_label}>
            Momo Number
          </label>
          <p className={styles.redirect}>
            Already have and account? <Link href="/auth/login">Login</Link>{" "}
          </p>
        </div>
        <button className={styles.submit + " " + primaryBold.className}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default register;
