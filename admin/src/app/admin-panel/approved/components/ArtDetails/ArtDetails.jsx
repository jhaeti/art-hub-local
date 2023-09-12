import ArtCard2 from "@/app/components/ArtCard/ArtCard2";
import styles from "./styles.module.css";
import { primaryBold } from "@/app/fonts";
import DisapproveArtBtn from "../DisapproveArtBtn";
const ArtDetails = ({ art }) => {
	return (
		<div style={{ marginTop: "2rem" }} className={styles.content}>
			<div className={styles.art_container}>
				<ArtCard2 disableAnimation art={art} showSellerName />
			</div>
			<div className={styles.details}>
				<p>
					Name:{" "}
					<span className={primaryBold.className + " " + styles.name}>
						{art.name}
					</span>
				</p>
				<p>
					Price: <span className={styles.price}>GHC {art.price}</span>
				</p>
				<p>
					Quantity: <span>{art.quantity}</span>
				</p>
				<div>
					<p>Description:</p>
					<p
						style={{ marginTop: "0.5rem" }}
						className={styles.description}
					>
						{art.description}
					</p>
				</div>
				<div>
					<DisapproveArtBtn art={art} />
				</div>
			</div>
		</div>
	);
};

export default ArtDetails;
