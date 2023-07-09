"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.css";
import { primaryBold } from "../fonts";
import apiUrl from "../utils/apiUrl";

const addProduct = () => {
  const [state, setState] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    img: null,
  });
  const router = useRouter();

  function handleChange(e) {
    if ((e.target.id === "quantity") | "price") {
      return setState((prev) => ({
        ...prev,
        [e.target.id]: +e.target.value,
      }));
    }
    if (e.target.id === "img") {
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
      res.ok && router.push("/profile/products");
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
          <label
            htmlFor="img"
            style={{
              padding: "2rem",
              background: "var(--color-gray)",
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
        </div>
        <button
          style={{
            textTransform: "uppercase",
            width: "30rem",
            height: "5rem",
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
      </form>
    </div>
  );
};

export default addProduct;
