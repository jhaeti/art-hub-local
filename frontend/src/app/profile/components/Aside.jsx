import styles from "../styles.module.css";
import useUserContext from "@/app/hooks/useUserContext";
const Aside = () => {
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
    </aside>
  );
};

export default Aside;
