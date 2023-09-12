import apiUrl from "@/app/utils/apiUrl";
import ArtDetails from "../components/ArtDetails/ArtDetails";

const product = async ({ params }) => {
	const res = await fetch(`${apiUrl}/products/${params.id}`, {
		cache: "no-store",
		credentials: "include",
	});
	const data = await res.json();
	return (
		res.ok && (
			<div className="container safe_area">
				<ArtDetails art={data} />
			</div>
		)
	);
};

export default product;
