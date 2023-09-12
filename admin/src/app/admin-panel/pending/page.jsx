import ArtCard from "@/app/components/ArtCard/ArtCard";
import Cards from "@/app/components/Cards/Cards";
import apiUrl from "@/app/utils/apiUrl";
import { cookies } from "next/dist/client/components/headers";

const page = async () => {
	const pendingArtsRes = await fetch(`${apiUrl}/products/pending`, {
		headers: {
			Cookie: cookies(),
		},
	});

	const pendingArts = await pendingArtsRes.json();
	return (
		<div>
			{pendingArtsRes.ok && (
				<Cards arts={pendingArts} showSellerName columns={3} />
			)}
		</div>
	);
};

export default page;
