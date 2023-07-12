import apiUrl from "@/app/utils/apiUrl";
import { cookies } from "next/dist/client/components/headers";
import Cards from "@/app/components/Cards/Cards";
import AddProductBtn from "../components/AddProductBtn";

async function products() {
  const res = await fetch(apiUrl + "/users/my-products", {
    headers: {
      Cookie: cookies(),
    },
  });
  const data = await res.json();

  return (
    res.ok && (
      <>
        <AddProductBtn />
        <Cards showSellerName showRemoveBtn arts={data} columns={2} />
      </>
    )
  );
}

export default products;
