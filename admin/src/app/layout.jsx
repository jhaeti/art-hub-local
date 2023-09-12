import "./index.css";
import { primary } from "./fonts";

import Navbar from "./components/Navbar/Navbar";
import Provider from "./context/Provider";
import apiUrl from "./utils/apiUrl";
import { cookies } from "next/dist/client/components/headers";
import Alert from "./components/Alert/Alert";

export const metadata = {
	title: "Art Hub Local",
	description: "Website for making art and culture accessible",
};

export default async function RootLayout({ children }) {
	const res = await fetch(apiUrl + "/users/me", {
		headers: {
			Cookie: cookies(),
		},
	});
	const data = await res.json();

	return (
		<html lang="en">
			<body style={{ width: "100%" }} className={primary.className}>
				<Provider>
					<Navbar userData={res.ok && data} />
					<Alert />
					<div className="safe_area container">{children}</div>
				</Provider>
			</body>
		</html>
	);
}
