import { useState } from "react";
import { useParams } from "react-router-dom";
import StockChart from "./stockchart";
import Topnews from "./topnews";

import "./mainpage.css";

function Mainpage() {
  const { symbol } = useParams();

  const [ai, setAi] = useState("");

  return (
    <div className="mainpage">
      <div className="chart-box">
        <h1>{symbol}</h1>

        <StockChart
          symbol={symbol}
          setAi={setAi}
        />
      </div>

      <div className="topnews-box">
        <h2>Top News</h2>
      </div>

      <div className="price-box">
        Price High Low
      </div>

      <div className="chat-box">
        <h2>AI Suggestion</h2>

        <p>{ai}</p>

        <span>
          Based on 30-day price movement
        </span>
      </div>

      <div className="news-box">
        <Topnews symbol={symbol} />
      </div>
    </div>
  );
}

export default Mainpage;
