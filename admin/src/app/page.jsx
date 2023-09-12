import styles from "./styles.module.css";
import AdminLoginForm from "./components/AdminLoginForm";

const Homepage = async () => {
	return (
		<>
			<div className={styles.login_box}>
				<h2>Admin Login</h2>
				<AdminLoginForm />
			</div>
		</>
	);
};

export default Homepage;
