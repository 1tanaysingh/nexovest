import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./favstocks.css";




function Favstocks() {
  const navigate = useNavigate();
  const [topstocks, setTopstocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [searchstock, setSearchstock] = useState("");
  const [results, setResults] = useState([]);

  const API_KEY = "104d64CzOSVj2h030DiCs3zLwB3Vubca";

  useEffect(() => {
    async function searchStocks() {
      if (searchstock.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://financialmodelingprep.com/stable/search-symbol?query=${searchstock}&apikey=${API_KEY}`
        );

        setResults(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    searchStocks();
  }, [searchstock]);

  useEffect(() => {
    async function getStocks() {
      try {
        const res = await axios.get(
          `https://financialmodelingprep.com/stable/most-actives?apikey=${API_KEY}`
        );

        const stocks = res.data.slice(0, 20);

        setTopstocks(stocks);

        
       

        console.log("Today Stocks:", todaystocks);
      } catch (error) {
        console.log(error);
      }
    }

    getStocks();
  }, []);

  const handleSelect = (symbol) => {
    if (selectedStocks.includes(symbol)) {
      setSelectedStocks(
        selectedStocks.filter((item) => item !== symbol)
      );
    } else if (selectedStocks.length < 5) {
      setSelectedStocks([...selectedStocks, symbol]);
    }
  };

  const saveFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/savefavstocks",
        {
          stockIds: selectedStocks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Stocks Saved Successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const displayStocks =
    searchstock.trim() === "" ? topstocks : results;

  return (
    <div className="stock-page">
      <h1>Choose Your Favorite Stocks</h1>

      <p className="subtitle">
        Select any 5 stocks to personalize your dashboard
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Stocks..."
          value={searchstock}
          onChange={(e) =>
            setSearchstock(e.target.value)
          }
        />
      </div>

      <div className="selected-bar">
        {selectedStocks.map((stock) => (
          <span key={stock}>{stock}</span>
        ))}
      </div>

      <div className="stocks-container">
        {displayStocks.map((stock) => (
          <div
            key={stock.symbol}
            className={`stock-card ${
              selectedStocks.includes(stock.symbol)
                ? "selected"
                : ""
            }`}
            onClick={() =>
              handleSelect(stock.symbol)
            }
          >
            <div className="stock-symbol">
              {stock.symbol}
            </div>

            <div className="stock-name">
              {stock.name}
            </div>

            {stock.price && (
              <div className="stock-price">
                ${stock.price}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="selection-count">
        <span>{selectedStocks.length}</span>/5 Selected
      </p>

      <button
        className="save-btn"
        disabled={selectedStocks.length !== 5}
        onClick={saveFavorites}
      >
        Save Favorites
      </button>
    </div>
  );
}

export default Favstocks;