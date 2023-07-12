import apiUrl from "@/app/utils/apiUrl";
import { cookies } from "next/dist/client/components/headers";
import SalesTable from "../components/SalesTable";

const sales = async () => {
  const res = await fetch(apiUrl + "/user/sales", {
    headers: {
      Cookie: cookies(),
    },
  });
  const data = await res.json();
  return res.ok && <SalesTable products={data} />;
};

export default sales;
