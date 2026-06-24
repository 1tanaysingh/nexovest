import { useState, useEffect } from "react";
import axios from "axios";
import "./topstocks.css";
import { useNavigate } from "react-router-dom";

function TopStocks() {
  const [todaystocks, setTodayStocks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate();

  const API_KEY = "GsjYhMkRn5wv0OPw8xens4cWuK2G0bEI";

  useEffect(() => {
    async function getStocks() {
      try {
        const res = await axios.get(
          `https://financialmodelingprep.com/stable/most-actives?apikey=${API_KEY}`
        );

        console.log("API Response:", res.data);

        setTodayStocks(res.data.slice(0, 20));
      } catch (error) {
        console.error(error);
      }
    }

    getStocks();
  }, []);

  const loadMore = () => {
    if (visibleCount >= todaystocks.length) {
      setVisibleCount(5);

      window.scrollTo({
        top: document.querySelector(".top-movers-section").offsetTop,
        behavior: "smooth",
      });
    } else {
      setVisibleCount((prev) => prev + 5);

      setTimeout(() => {
        window.scrollBy({
          top: 300,
          behavior: "smooth",
        });
      }, 100);
    }
  };

 return (
  <section className="top-movers-section">
    <div className="section-header">
      <h2>🚀 Top Movers Today</h2>
      <p>Most active stocks in the market right now</p>
    </div>

    <div className="stocks-grid">
      {todaystocks.slice(0, visibleCount).map((stock) => (
        <div
          className="stock-card"
          key={stock.symbol}
          onClick={() => {
            console.log("Clicked Stock:", stock);
            navigate(`/mainpage/${stock.symbol}`);
          }}
        >
          <div className="card-top">
            <h3>{stock.symbol}</h3>
            <span className="stock-name">
              {stock.name || "Company"}
            </span>
          </div>

          <div className="stock-price">
            $
            {stock.price
              ? Number(stock.price).toFixed(2)
              : "N/A"}
          </div>

          <div
            className={`stock-change ${
              stock.change > 0 ? "positive" : "negative"
            }`}
          >
            {stock.change > 0 ? "▲" : "▼"}{" "}
            {stock.change
              ? Number(stock.change).toFixed(2)
              : "0.00"}
          </div>

          <div className="volume">
            Volume:{" "}
            {stock.volume
              ? Number(stock.volume).toLocaleString()
              : "N/A"}
          </div>
        </div>
      ))}
    </div>

    {todaystocks.length > 0 && (
      <div className="btn-container">
        <button className="load-btn" onClick={loadMore}>
          {visibleCount >= todaystocks.length
            ? "Show Again"
            : "Load More Stocks"}
        </button>
      </div>
    )}
  </section>
);
}

export default TopStocks;