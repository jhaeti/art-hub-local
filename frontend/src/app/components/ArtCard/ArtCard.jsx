"use client";

import { useRouter } from "next/navigation";
import RemoveArtBtn from "./RemoveArtBtn";
import styles from "./styles.module.css";

const ArtCard = ({ art, disableAnimation, showSellerName, showRemoveBtn }) => {
  const router = useRouter();
  return (
    <div className={styles.card + " " + (!disableAnimation && styles.animate)}>
      <img
        onClick={() => {
          router.push("/products/" + String(art._id), { query: art });
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
