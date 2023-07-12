import apiUrl from "@/app/utils/apiUrl";
import { cookies } from "next/dist/client/components/headers";
import OrdersTable from "../components/OrdersTable";

const orders = async () => {
  const res = await fetch(apiUrl + "/users/orders", {
    headers: {
      Cookie: cookies(),
    },
  });
  const data = await res.json();
  return res.ok && <OrdersTable orders={data} />;
};

export default orders;
