import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import apiUrl from "@/app/utils/apiUrl";
import useUserContext from "@/hooks/useUserContext";
const FavBtn = ({ art }) => {
  const [isFav, setIsFav] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { state } = useUserContext();
  useLayoutEffect(() => {
    if (state.user.favorites.includes(art._id)) {
      setClickCount(1);
      setIsFav(true);
    }
  }, []);

  async function handleClick() {
    if (clickCount < 1) {
      const res = await fetch(apiUrl + "/products/add-to-fav/" + art._id, {
        method: "PUT",
        credentials: "include",
      });
      if (res.ok) {
        setIsFav(true);
        setClickCount((prev) => ++prev);
      }
    }
  }
  return (
    <button onClick={handleClick} className={styles.remove}>
      <Image
        width={20}
        height={20}
        style={{ opacity: isFav ? 1 : 0.4 }}
        src="/favorite-svg.svg"
        alt="Favorite icon"
      />
    </button>
  );
};

export default FavBtn;
