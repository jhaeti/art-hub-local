import apiUrl from "@/app/utils/apiUrl";
import ArtDetails from "../components/ArtDetails/ArtDetails";
import { cookies } from "next/dist/client/components/headers";

const product = async ({ params }) => {
	const res = await fetch(`${apiUrl}/products/approved/${params.id}`, {
		headers: {
			Cookie: cookies(),
		},
	});
	const data = await res.json();

	return res.ok && data ? (
		<div className="container safe_area">
			<ArtDetails art={data} />
		</div>
	) : (
		<h1>404. Art not found</h1>
	);
};

export default product;
