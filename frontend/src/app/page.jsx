import { cookies } from "next/dist/client/components/headers";
import Hero from "./components/Hero/Hero";
import ScrollDownAnimation from "./components/ScrollDownAnimation/ScrollDownAnimation";
import apiUrl from "./utils/apiUrl";
import Cards from "./components/Cards/Cards";

const Homepage = async () => {
	const res = await fetch(apiUrl + "/products", {
		headers: {
			Cookie: cookies(),
		},
	});
	const data = await res.json();

	return (
		<>
			<Hero />
			<ScrollDownAnimation />
			<div className="container mt-6 mb-6">
				{res.ok && <Cards arts={data} showSellerName columns={3} />}
			</div>
		</>
	);
};

export default Homepage;
