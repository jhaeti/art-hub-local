"use client";
import { useState } from "react";
import apiUrl from "@/app/utils/apiUrl";
import styles from "./styles.module.css";

function products() {
  const [arts, setArts] = useState([]);
  (async function getMyArts() {
    const res = await fetch(apiUrl + "/users/my-products", {
      credentials: "include",
    });
    const data = await res.json();
    res.ok && data && setArts(data);
  })();

  return (
    <div className={styles.grid}>
      {arts &&
        arts.map((art) => (
          <div>
            <h4>{art.name}</h4>
            <img
              width={"300"}
              src={"data:image/jpg;base64," + art.img}
              alt={art.description}
            />
          </div>
        ))}
    </div>
  );
}

export default products;
