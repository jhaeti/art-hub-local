"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.css";
import { primaryBold } from "../fonts";
import apiUrl from "../utils/apiUrl";
import useMsgContext from "../hooks/useMsgContext";
import { WARN } from "../context/MsgContext";

const addProduct = () => {
  const [state, setState] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    img: null,
  });
  const router = useRouter();
  const { dispatch } = useMsgContext();

  function handleChange(e) {
    if (e.target.type === "number") {
      return setState((prev) => ({
        ...prev,
        [e.target.id]: +e.target.value,
      }));
    }
    if (e.target.id === "img") {
      const imageSrc = URL.createObjectURL(e.target.files[0]);
      /**
       * Select the image preview element.
       */
      const imagePreviewElement = document.querySelector(
        "#preview-selected-image"
      );
      /**
       * Assign the path to the image preview element.
       */
      imagePreviewElement.src = imageSrc;
      /**
       * Show the element by changing the display value to "block".
       */
      imagePreviewElement.style.display = "block";
      return setState((prev) => ({
        ...prev,
        [e.target.id]: e.target.files[0],
      }));
    }
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    for (const name in state) {
      formData.append(name, state[name]);
    }
    (async function postProduct() {
      const res = await fetch(apiUrl + "/products", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      res.ok
        ? router.push("/profile/products")
        : dispatch({ type: WARN, payload: await res.json() });
    })();
  }

  return (
    <div className={"cover_screen safe_area container"}>
      <form
        onSubmit={handleSubmit}
        className={styles.form + " mt-2"}
        encType="multipart/form-data"
      >
        <div className={styles.form_control}>
          <label htmlFor="name">Name :</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            value={state.name}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="quantity">Number in stock :</label>
          <input
            onChange={handleChange}
            type="number"
            id="quantity"
            value={state.quantity}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="price">Price :</label>
          <input
            onChange={handleChange}
            type="number"
            id="price"
            value={state.price}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="description">Description :</label>

          <input
            onChange={handleChange}
            type="text"
            id="description"
            value={state.description}
            placeholder="Description of product"
          />
        </div>
        <div className={styles.form_control}>
          <img className={styles.img} id="preview-selected-image" />
        </div>
        <div className={styles.form_control}>
          <label
            htmlFor="img"
            style={{
              padding: "2rem",
              background: `${state.img ? "green" : "var(--color-gray)"} `,
              color: "var(--color-white)",
            }}
          >
            Upload Image
          </label>

          <input
            style={{
              visibility: "hidden",
            }}
            onChange={handleChange}
            type="file"
            id="img"
          />
          <button
            style={{
              display: "block",
              padding: "2rem",
              width: "100%",
              textTransform: "uppercase",
              background: "var(--color-primary)",
              color: "var(--color-dark)",
              border: "none",
              outline: "none",
              borderRadius: "2px",
              fontSize: "2.4rem",
            }}
            className={primaryBold.className}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default addProduct;
