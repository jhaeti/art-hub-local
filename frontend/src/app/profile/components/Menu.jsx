import styles from "../styles.module.css";
import { primaryBold } from "@/app/fonts";
import { usePathname, useRouter } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const active = (path) => pathname === path;
  return (
    <ul className={styles.menu}>
      <li
        onClick={() => router.push("/profile/orders")}
        className={active("/profile/orders") && primaryBold.className}
      >
        Orders
      </li>
      <li
        onClick={() => router.push("/profile/favorites")}
        className={active("/profile/favorites") && primaryBold.className}
      >
        Favorites
      </li>
      <li
        onClick={() => router.push("/profile/products")}
        className={active("/profile/products") && primaryBold.className}
      >
        Products
      </li>
      <li
        onClick={() => router.push("/profile/sales")}
        className={active("/profile/sales") && primaryBold.className}
      >
        Sales
      </li>
    </ul>
  );
};

export default Menu;
