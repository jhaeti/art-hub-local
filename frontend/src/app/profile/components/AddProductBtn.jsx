"use client";
import { useRouter } from "next/navigation";
import { primaryBold } from "@/app/fonts";
import styles from "../styles.module.css";
const AddProductBtn = () => {
  const router = useRouter();
  return (
    <div className={styles.btn_container}>
      <button
        onClick={() => {
          router.push("/add-product");
        }}
        className={primaryBold.className + " " + styles.add_art_btn}
      >
        Add art
      </button>
    </div>
  );
};

export default AddProductBtn;
