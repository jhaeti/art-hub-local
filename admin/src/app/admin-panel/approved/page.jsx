import Cards2 from "@/app/components/Cards/Cards2";
import apiUrl from "@/app/utils/apiUrl";
import { cookies } from "next/dist/client/components/headers";

const page = async () => {
	const artsRes = await fetch(`${apiUrl}/products`, {
		headers: {
			Cookie: cookies(),
		},
	});

	const arts = await artsRes.json();

	return (
		<div>
			{artsRes.ok && (
				<Cards2
					arts={arts}
					disableAnimation
					showSellerName
					columns={3}
				/>
			)}
		</div>
	);
};

export default page;
