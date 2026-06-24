import Navbar from "./navbar/navbar";
import Famous from "./majorstock/famous";
import TopStocks from "./topstocks/topstocks"; 
import "./herosection.css";
function HeroSection() {
  console.log("Hero Section");
  return (
    <>
      <Navbar />
      <Famous />
      <TopStocks />
    </>
  );
}

export default HeroSection;