"use client";
import apiUrl from "@/app/utils/apiUrl";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
const RemoveArtBtn = ({ id }) => {
  const router = useRouter();
  function handleRemoveArt() {
    (async function remAction() {
      const res = await fetch(apiUrl + "/products/" + id, {
        method: "DELETE",
        credentials: "include",
      });
      res.ok && router.refresh();
    })();
  }
  return (
    <button onClick={handleRemoveArt} className={styles.remove}>
      <span></span>
    </button>
  );
};

export default RemoveArtBtn;
