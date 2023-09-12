import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import apiUrl from "@/app/utils/apiUrl";
import useUserContext from "@/app/hooks/useUserContext";
import useMsgContext from "@/app/hooks/useMsgContext";
import { ERROR } from "@/app/context/MsgContext";
const FavBtn = ({ art }) => {
  const [isFav, setIsFav] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { state } = useUserContext();
  const { dispatch } = useMsgContext();
  useLayoutEffect(() => {
    if (state.isAuthenticated && state.user.favorites.includes(art._id)) {
      setClickCount(1);
      setIsFav(true);
    }
  }, []);

  async function handleClick() {
    if (state.isAuthenticated) {
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
    } else {
      dispatch({ type: ERROR, payload: "Login to add to favorites" });
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
