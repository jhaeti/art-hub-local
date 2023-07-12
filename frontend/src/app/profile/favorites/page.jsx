import Cards from "@/app/components/Cards/Cards";
import apiUrl from "@/app/utils/apiUrl";
import { cookies } from "next/dist/client/components/headers";

const favorites = async () => {
  const res = await fetch(apiUrl + "/users/my-favorites", {
    headers: {
      Cookie: cookies(),
    },
  });
  const data = await res.json();
  return (
    res.ok && (
      <div>
        <Cards
          columns={2}
          showRemoveBtn
          showSellerName
          shouldRemoveFromFav
          arts={data}
        />
      </div>
    )
  );
};

export default favorites;
