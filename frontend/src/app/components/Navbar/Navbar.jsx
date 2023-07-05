import Image from "next/image";
import Link from "next/link";
import * as fonts from "../../fonts";
import styles from "./styels.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={"container" + " " + styles.container}>
        <Link href="/">
          <Image src="/logo.svg" width={94} height={54} />
        </Link>
        <ul>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
          <li className={styles.join}>
            <Link href="/auth/join" className={fonts.primaryBold.className}>
              Join
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
