"use client";

import { useRouter } from "next/navigation";
import RemoveArtBtn from "./RemoveArtBtn";
import styles from "./styles.module.css";

const ArtCard = ({ art, showSellerName, showRemoveBtn }) => {
  const router = useRouter();
  return (
    <div className={styles.card}>
      <img
        onClick={() => {
          router.push("/products/" + String(art._id));
        }}
        className={styles.img}
        src={"data:image/jpg;base64," + art.img}
        alt={art.description}
      />
      {showSellerName && <p> - {art.sellerName}</p>}

      {showRemoveBtn && <RemoveArtBtn id={art._id} />}
    </div>
  );
};

export default ArtCard;
