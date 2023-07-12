"use client";
import apiUrl from "@/app/utils/apiUrl";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
const RemoveArtBtn = ({ id, shouldRemoveFromFav }) => {
  const router = useRouter();
  async function handleRemoveArt() {
    if (shouldRemoveFromFav) {
      const res = await fetch(apiUrl + "/products/remove-from-fav/" + id, {
        method: "PUT",
        credentials: "include",
      });
      res.ok && router.refresh();
    } else {
      const res = await fetch(apiUrl + "/products/" + id, {
        method: "DELETE",
        credentials: "include",
      });
      res.ok && router.refresh();
    }
  }
  return (
    <button onClick={handleRemoveArt} className={styles.remove}>
      <span></span>
    </button>
  );
};

export default RemoveArtBtn;
