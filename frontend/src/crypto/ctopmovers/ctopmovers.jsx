import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TopCrypto() {
  const [todayCoins, setTodayCoins] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate();

  const CRYPTO_API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

  useEffect(() => {
    async function getCoins() {
      try {
        const res = await axios.get(CRYPTO_API);

        console.log("Crypto API Response:", res.data);

        setTodayCoins(res.data.slice(0, 20));
      } catch (error) {
        console.error(error);
      }
    }

    getCoins();
  }, []);

  const loadMore = () => {
    if (visibleCount >= todayCoins.length) {
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
        <h2>🚀 Top Crypto Movers Today</h2>
        <p>Most active crypto coins in the market right now</p>
      </div>

      <div className="stocks-grid">
        {todayCoins.slice(0, visibleCount).map((coin) => {
          const change = coin.price_change_percentage_24h || 0;
          const isPositive = change > 0;

          return (
            <div
              className="stock-card"
              key={coin.id || coin.symbol}
              onClick={() => {
                console.log("Clicked Coin:", coin);
                navigate(`/chomepage/${coin.id}`);
              }}
            >
              <div className="card-top">
                <div className="coin-info">
                  {coin.image && (
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="coin-img"
                    />
                  )}

                  <div>
                    <h3>{coin.symbol?.toUpperCase()}</h3>
                    <span className="stock-name">
                      {coin.name || "Crypto Coin"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="stock-price">
                $
                {coin.current_price
                  ? Number(coin.current_price).toLocaleString()
                  : "N/A"}
              </div>

              <div
                className={`stock-change ${
                  isPositive ? "positive" : "negative"
                }`}
              >
                {isPositive ? "▲" : "▼"} {Number(change).toFixed(2)}%
              </div>

              <div className="volume">
                Market Cap:{" "}
                {coin.market_cap
                  ? `$${Number(coin.market_cap).toLocaleString()}`
                  : "N/A"}
              </div>
            </div>
          );
        })}
      </div>

      {todayCoins.length > 0 && (
        <div className="btn-container">
          <button className="load-btn" onClick={loadMore}>
            {visibleCount >= todayCoins.length
              ? "Show Again"
              : "Load More Coins"}
          </button>
        </div>
      )}
    </section>
  );
}

export default TopCrypto;