import { useEffect, useState } from "react";
import axios from "axios";
import "./Cnavbar.css";
import TopCrypto from "../ctopmovers/ctopmovers";
import { useNavigate } from "react-router-dom";


function Cnavbar() {
  const [top5, setTop5] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
      )
      .then((res) => setTop5(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="crypto-page">
      <nav className="navbar">
        <div className="nav-links">
          <button className="nav-btn active">Explore</button>
          <button onClick={() => navigate("/sendcrypto")} className="nav-btn">
            Favourites
          </button>
          <button onClick={() => navigate("/choice")} className="nav-btn">
            Switch to stocks
          </button>
        </div>
      </nav>

      <main className="crypto-content">
        <h1>Market Overview</h1>

        <div className="coin-grid">
          {top5.map((coin) => {
            const isPositive = coin.price_change_percentage_24h >= 0;

            return (
              <div className="coin-card" key={coin.id}>
                <div className="coin-title">
                  <img src={coin.image} alt={coin.name} />
                  <h2>{coin.symbol.toUpperCase()}</h2>
                </div>

                <h3>${coin.current_price.toLocaleString()}</h3>

                <div className="card-line"></div>

                <p className={isPositive ? "green" : "red"}>
                  {isPositive ? "▲" : "▼"}{" "}
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            );
          })}
        </div>
      </main>

      <TopCrypto />
    </section>
  );
}

export default Cnavbar;