import ArtCard2 from "../ArtCard/ArtCard2";
import styles from "./styles.module.css";
const Cards2 = ({
	arts,
	showSellerName,
	showRemoveBtn,
	columns,
	shouldRemoveFromFav,
}) => {
	return (
		<div id="arts" style={{ "--columns": columns }} className={styles.grid}>
			<div>
				{arts &&
					arts
						.filter((_a, i) => i % columns == 0)
						.map((art) => (
							<ArtCard
								showSellerName={showSellerName}
								showRemoveBtn={showRemoveBtn}
								shouldRemoveFromFav={shouldRemoveFromFav}
								art={art}
							/>
						))}
			</div>
			<div>
				{arts &&
					arts
						.filter((_a, i) => i % columns == 1)
						.map((art) => (
							<ArtCard2
								showSellerName={showSellerName}
								showRemoveBtn={showRemoveBtn}
								art={art}
							/>
						))}
			</div>
			{columns === 3 && (
				<div>
					{arts &&
						arts
							.filter((_a, i) => i % columns == 2)
							.map((art) => (
								<ArtCard
									showSellerName={showSellerName}
									showRemoveBtn={showRemoveBtn}
									art={art}
								/>
							))}
				</div>
			)}
		</div>
	);
};

export default Cards2;
