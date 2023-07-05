import Link from "next/link";
import { primaryBold } from "@/app/fonts";
import styles from "./styles.module.css";

const register = () => {
  return (
    <div className={styles.register_box}>
      <h2 className={primaryBold.className + " " + styles.heading_secondary}>
        Register
      </h2>
      <form className={styles.form}>
        <div className={styles.form_control}>
          <input type="text" id="name" className={styles.form_input} required />
          <label htmlFor="name" className={styles.form_input_label}>
            Your name
          </label>
        </div>
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
        <div className={styles.form_control}>
          <input
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
            type="text"
            id="email"
            className={styles.form_input}
            required
          />
          <label htmlFor="email" className={styles.form_input_label}>
            Email
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
