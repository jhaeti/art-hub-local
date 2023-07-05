import styles from "./styles.module.css";
import { secondary } from "../../fonts";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className="container">
        <h1 className={styles.heading + " " + secondary.className}>
          Explore <span>l</span>
          <span>o</span>
          <span>c</span>
          <span>a</span>
          <span>l</span> <span>a</span>
          <span>r</span>
          <span>t</span>
          <span>s</span> an cultural splendors.
        </h1>
        <p>
          Experience a fusion of art, culture, and community spirit in a
          captivating exhibition that celebrates our local talents.
        </p>
      </div>
    </div>
  );
};

export default Hero;
