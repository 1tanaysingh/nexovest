import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sendcrypto.css";
import axios from "axios";


function Sendcrypto() {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavouriteCryptos = async () => {
      try {
        // 1. Favourite crypto IDs from backend
        const response = await axios.get(
          "http://localhost:5000/sendfavcrypto",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        // 2. Make array of ids
        const ids = [
          response.data.cryptoid1,
          response.data.cryptoid2,
          response.data.cryptoid3,
          response.data.cryptoid4,
          response.data.cryptoid5,
        ].filter(Boolean);

        // 3. Fetch live market data
        const marketResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: ids.join(","),
              order: "market_cap_desc",
              per_page: 5,
              page: 1,
              sparkline: false,
            },
          },
        );

        setCrypto(marketResponse.data);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteCryptos();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  function handleClick(coinId) {
    navigate(`/chomepage/${coinId}`);
  }

 return (
  <div className="favcrypto-container">
    <div className="favcrypto-header">
      <h2>Favourite Cryptos</h2>
      <span>{crypto.length} Assets</span>
    </div>

    <div className="favcrypto-grid">
      {crypto.map((coin) => (
        <div
          key={coin.id}
          className="crypto-card"
          onClick={() => handleClick(coin.id)}
        >
          <div className="crypto-top">
            <img src={coin.image} alt={coin.name} />

            <div>
              <h3>{coin.name}</h3>
              <p>{coin.symbol.toUpperCase()}</p>
            </div>
          </div>

          <div className="crypto-price">
            <h2>${coin.current_price.toLocaleString()}</h2>

            <span
              className={
                coin.price_change_percentage_24h >= 0
                  ? "profit"
                  : "loss"
              }
            >
              {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>

          <div className="crypto-bottom">
            <span>Market Cap</span>

            <strong>
              ${coin.market_cap.toLocaleString()}
            </strong>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Sendcrypto;
