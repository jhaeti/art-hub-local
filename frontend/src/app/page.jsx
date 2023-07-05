import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import ScrollDownAnimation from "./components/ScrollDownAnimation/ScrollDownAnimation";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ScrollDownAnimation />
    </>
  );
};

export default Homepage;
