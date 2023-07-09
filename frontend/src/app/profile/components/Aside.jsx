import { useRouter } from "next/navigation";
import { primaryBold } from "@/app/fonts";
import styles from "../styles.module.css";
import useUserContext from "@/hooks/useUserContext";
const Aside = () => {
  const router = useRouter();
  const {
    state: { user },
  } = useUserContext();
  return (
    <aside className={styles.side}>
      <div className="mt-2">
        <small className={styles.small_label}>Your name</small>
        <h4 className={styles.value}>{user && user.name && user.name}</h4>
      </div>
      <div className="mt-1">
        <small className={styles.small_label}>Email</small>
        <h4 className={styles.value}>{user && user.email && user.email}</h4>
      </div>
      <div className="mt-1">
        <small className={styles.small_label}>Momo Number</small>
        <h4 className={styles.value}>{user && user.momo && user.momo}</h4>
      </div>

      <div className={styles.side_action}>
        <button>Change Password</button>
        <button>Edit Profile</button>
      </div>
      <button
        onClick={() => {
          router.push("/add-product");
        }}
        className={primaryBold.className + " " + styles.add_art_btn}
      >
        Add art
      </button>
    </aside>
  );
};

export default Aside;
