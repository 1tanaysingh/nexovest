import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sendstocks() {
  const navigate = useNavigate();

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavouriteStocks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/sendfavstocks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Agar backend stockIds array bhej raha hai
        setStocks(res.data.stockIds);

        console.log(res.data.stockIds);
      } catch (error) {
        console.error(
          "Error fetching favorite stocks:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteStocks();
  }, []);

  const handleClick = (symbol) => {
    navigate(`/mainpage/${symbol}`);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

return (
  <div className="stocks-page">

    <div className="stocks-bg-circle circle1"></div>
    <div className="stocks-bg-circle circle2"></div>

    <div className="section-title">
      <div className="line"></div>
      <h2>Favourite Stocks</h2>
    </div>

    <div className="stocks-grid">
      {stocks.map((stock, index) => (
        <div
          key={index}
          className="stock-card"
          onClick={() => handleClick(stock)}
        >
          <div className="stock-glow"></div>

          <div className="stock-top">
            <div className="stock-logo">
              {stock.charAt(0)}
            </div>

            <div>
              <h2>{stock}</h2>
              <span>NASDAQ</span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="stock-middle">
            <div>
              <small>Status</small>
              <h4 className="green">● Live</h4>
            </div>

            <div>
              <small>Exchange</small>
              <h4>US Market</h4>
            </div>
          </div>

          <div className="divider"></div>

          <button className="view-btn">
            View Details →
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default Sendstocks;
