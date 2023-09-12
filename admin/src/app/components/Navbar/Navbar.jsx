"use client";
import Image from "next/image";
import { useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import * as fonts from "../../fonts";
import styles from "./styles.module.css";
import useUserContext from "@/app/hooks/useUserContext";
import { REMOVE_USER, ADD_USER } from "@/app/context/UserContext";
import apiUrl from "@/app/utils/apiUrl";

const Navbar = ({ userData }) => {
	const router = useRouter();
	const pathname = usePathname();
	const {
		state: { isAuthenticated },
		dispatch,
	} = useUserContext();

	useLayoutEffect(() => {
		userData &&
			dispatch({
				type: ADD_USER,
				user: userData.user,
				token: userData.token,
			});
		userData && pathname === "/" && router.push("/admin-panel");
	}, []);

	function logout() {
		fetch(apiUrl + "/users/logout", {
			credentials: "include",
		}).then(() => {
			dispatch({ type: REMOVE_USER });
			router.push("/");
		});
	}

	return (
		<nav
			style={{
				"--bg-color": !(
					pathname === "/" || pathname.startsWith("/auth")
				)
					? "var(--color-dark-transparent)"
					: "var(--color-white-transparent)",
			}}
			className={styles.nav}
		>
			<div className={"container" + " " + styles.container}>
				<Link href="/">
					<Image
						priority={true}
						alt="Art hub local logo"
						src={"/logo_dark.svg"}
						width={94}
						height={54}
					/>
				</Link>
				<ul>
					{isAuthenticated && (
						<li>
							<Link
								style={{
									color: "var(--color-dark)",
								}}
								href={"/admin-panel"}
							>
								{"Admin-panel"}
							</Link>
						</li>
					)}
					<li className={styles.join}>
						<button
							onClick={() => {
								isAuthenticated ? logout() : router.push("/");
							}}
							className={
								fonts.primaryBold.className + " " + styles.btn
							}
						>
							{isAuthenticated ? "Logout" : "Login"}
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
