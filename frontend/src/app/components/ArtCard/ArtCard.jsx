"use client";

import { useRouter } from "next/navigation";
import RemoveArtBtn from "./RemoveArtBtn";
import styles from "./styles.module.css";
import FavBtn from "./FavBtn";

const ArtCard = ({
  art,
  disableAnimation,
  showSellerName,
  showRemoveBtn,
  showFavBtn,
  shouldRemoveFromFav,
}) => {
  const router = useRouter();
  return (
    <div className={styles.card + " " + (!disableAnimation && styles.animate)}>
      <img
        onClick={() => {
          router.push("/products/" + String(art._id), { query: art });
        }}
        className={styles.img}
        src={`${process.env.NEXT_PUBLIC_API_URL}/products/${art._id}/img`}
        alt={art.description}
      />
      {showSellerName && <p> - {art.sellerName}</p>}

      {showRemoveBtn && (
        <RemoveArtBtn id={art._id} shouldRemoveFromFav={shouldRemoveFromFav} />
      )}
      {showFavBtn && <FavBtn art={art} />}
    </div>
  );
};

export default ArtCard;
