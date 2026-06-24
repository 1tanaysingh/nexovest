import { useNavigate } from "react-router-dom";

import "./choice.css";

function Choice() {
  const navigate = useNavigate();
  function handleCryptoClick() {
    navigate("/favcoins");
  }
  function handleStockClick() {
    navigate("/favstocks");
  }

  return (
    <div className="choice-page">
      <div className="overlay"></div>

      <div className="choice-container">
        <h1>Welcome to Nexovest</h1>

        <p>
          Choose your investment preference to personalize your dashboard.
        </p>

        <div className="choice-cards">
          <button onClick={handleCryptoClick} className="choice-card crypto-card">
            <div className="icon">₿</div>
            <h2>Crypto</h2>
            <span>Track top cryptocurrencies</span>
          </button>

          <button onClick={handleStockClick} className="choice-card stock-card">
            <div className="icon">📈</div>
            <h2>Stocks</h2>
            <span>Follow global stock markets</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Choice;