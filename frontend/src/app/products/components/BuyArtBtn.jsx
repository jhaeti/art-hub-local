"use client";

import apiUrl from "@/app/utils/apiUrl";
import { useRouter } from "next/navigation";

const BuyArtBtn = ({ art }) => {
  const router = useRouter();
  async function handleClick() {
    const body = {
      seller: art.seller,
      productId: art._id,
      productName: art.name,
      price: art.price,
      quantity: 1,
    };
    body.amount = body.price * body.quantity;
    const res = await fetch(apiUrl + "/products/order", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    res.ok && router.push("/profile/orders");
  }
  return <button onClick={handleClick}>Buy art</button>;
};

export default BuyArtBtn;
