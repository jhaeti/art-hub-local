import { cookies } from "next/dist/client/components/headers";
import apiUrl from "@/app/utils/apiUrl";
import styles from "./styles.module.css";
import Card from "./components/Card";

const page = async () => {
	const pendingCountRes = await fetch(`${apiUrl}/products/pending/count`, {
		headers: {
			Cookie: cookies(),
		},
	});
	const pendingCount = await pendingCountRes.json();

	const artCountRes = await fetch(`${apiUrl}/products/approved/count`, {
		headers: {
			Cookie: cookies(),
		},
	});
	const artCount = await artCountRes.json();

	const userCountRes = await fetch(`${apiUrl}/users/count`, {
		headers: {
			Cookie: cookies(),
		},
	});

	const userCount = await userCountRes.json();

	return (
		<>
			<div className={[styles.adminPanel].join(" ")}>
				<Card
					count={pendingCountRes.ok && pendingCount}
					label="PENDING ARTS"
					route="/admin-panel/pending"
				/>
				<Card
					count={artCountRes.ok && artCount}
					label="APPROVED ARTS"
					route="/admin-panel/approved"
				/>
				<Card
					count={userCountRes.ok && userCount}
					label="USERS"
					route="/admin-panel/users"
				/>
			</div>
		</>
	);
};

export default page;
