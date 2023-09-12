"use client";
import { useState } from "react";

import styles from "./styles.module.css";
import useUserContext from "@/app/hooks/useUserContext";
import useMsgContext from "@/app/hooks/useMsgContext";
import apiUrl from "@/app/utils/apiUrl";
import { ADD_USER } from "@/app/context/UserContext";
import { ERROR } from "@/app/context/MsgContext";
// import apiUrl from "@/app/utils/apiUrl";
// import useUserContext from "@/app/hooks/useUserContext";
import { useRouter } from "next/navigation";
// import { ADD_USER } from "@/app/context/UserContext";
// import { ERROR } from "@/app/context/MsgContext";
// import useMsgContext from "@/app/hooks/useMsgContext";

const AdminLoginForm = () => {
	const [state, setState] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();
	const { dispatch: userDispatch } = useUserContext();
	const { dispatch: msgDispatch } = useMsgContext();

	function handleChange(e) {
		setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	async function handleAdminLogin(e) {
		e.preventDefault();
		const res = await fetch(`${apiUrl}/users/admin/login`, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(state),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (res.ok) {
			userDispatch({
				type: ADD_USER,
				user: data.user,
				token: data.token,
			});
			router.push("/admin-panel");
		} else {
			msgDispatch({ type: ERROR, payload: data });
		}
	}

	return (
		<form>
			<div className={styles.group}>
				<input
					value={state.email}
					onChange={handleChange}
					name="email"
					type="text"
					required
				/>
				<span className="highlight"></span>
				<span className="bar"></span>
				<label>Email</label>
			</div>
			<div className={styles.group}>
				<input
					value={state.password}
					onChange={handleChange}
					name="password"
					type="password"
					required
				/>
				<span className="highlight"></span>
				<span className="bar"></span>
				<label>Password</label>
			</div>
			<button onClick={handleAdminLogin} className={styles.btn}>
				Login
			</button>
		</form>
	);
};

export default AdminLoginForm;
