import { useParams } from "react-router-dom";
import CryptoChart from "./cchart/cchart";
import Cnews from "./cnews/cnews";
import "./cmainpage.css";
function Cmainpage() {
  const { id } = useParams();

  return (
    <div className="crypto-main-page">
      <div className="crypto-layout">
        <section className="crypto-chart-panel">
          <CryptoChart id={id} />
        </section>

        <aside className="crypto-news-panel">
          <Cnews id={id} />
        </aside>
      </div>
    </div>
  );
}


export default Cmainpage;
