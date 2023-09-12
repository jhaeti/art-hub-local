import styles from "../styles.module.css";
import { primaryBold } from "@/app/fonts";
import useUserContext from "@/app/hooks/useUserContext";
import { usePathname, useRouter } from "next/navigation";

const Menu = () => {
	const pathname = usePathname();
	const router = useRouter();
	const {
		state: { user },
	} = useUserContext();
	const active = (path) => pathname === path;
	return (
		<ul className={styles.menu}>
			<li
				onClick={() => router.push("/profile/orders")}
				className={active("/profile/orders") && primaryBold.className}
			>
				Order History
			</li>
			<li
				onClick={() => router.push("/profile/favorites")}
				className={
					active("/profile/favorites") && primaryBold.className
				}
			>
				Favorites
			</li>
			{user && user.role === "ARTIST" && (
				<>
					<li
						onClick={() => router.push("/profile/products")}
						className={
							active("/profile/products") && primaryBold.className
						}
					>
						Products
					</li>
					<li
						onClick={() => router.push("/profile/sales")}
						className={
							active("/profile/sales") && primaryBold.className
						}
					>
						Sales
					</li>
				</>
			)}
		</ul>
	);
};

export default Menu;
