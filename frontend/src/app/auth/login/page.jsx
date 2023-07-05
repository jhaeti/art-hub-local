import Link from "next/link";
import { primaryBold } from "@/app/fonts";
import styles from "./styles.module.css";
const login = () => {
  return (
    <div className={styles.login_box}>
      <h2 className={primaryBold.className + " " + styles.heading_secondary}>
        Login
      </h2>
      <form className={styles.form}>
        <div className={styles.form_control}>
          <input
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
