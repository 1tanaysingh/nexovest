import { useEffect, useState } from "react";
import axios from "axios";
import "./favcoins.css";

function Favcoins() {
  const [topCoins, setTopCoins] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [search, setSearch] = useState("");

  // Top 20 Coins
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false",
      )
      .then((res) => setTopCoins(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Search Coins
  useEffect(() => {
    async function getData() {
      try {
        if (search.trim() === "") {
          setSearchResults([]);
          return;
        }

        const res = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${search}`,
        );

        setSearchResults(res.data.coins);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [search]);

  const handleSelect = (coinId) => {
    if (selectedCoins.includes(coinId)) {
      setSelectedCoins(selectedCoins.filter((id) => id !== coinId));
    } else if (selectedCoins.length < 5) {
      setSelectedCoins([...selectedCoins, coinId]);
    }
  };

  const saveFavorites = async () => {
    try {
      await axios.post(
        "http://localhost:5000/savefavcrypto",
        {
          cryptoIds: selectedCoins,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("Favorites saved successfully");
      alert("Favorites Saved");
    } catch (error) {
      console.log(error);
    }
    console.log("Selected Coins:", selectedCoins);
  };
  const displayCoins = search.trim() === "" ? topCoins : searchResults;

  return (
    <div className="top-coins-page">
      <div className="header">
        <h1>Select Your Favorite Cryptos</h1>
        <p>Choose any 5 cryptocurrencies to personalize your dashboard.</p>
      </div>

      <div className="container">
        <input
          type="text"
          placeholder="Search Coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="coins-container">
        {displayCoins.map((coin) => {
          const imageUrl = coin.image || coin.large || coin.thumb;
          const symbol = coin.symbol || coin.name?.slice(0, 3).toUpperCase();
          
          return (
            <div
              key={coin.id}
              className={`coin-card ${
                selectedCoins.includes(coin.id) ? "selected" : ""
              }`}
              onClick={() => handleSelect(coin.id)}
            >
              <img src={imageUrl} alt={coin.name} />

              <h3>{coin.name}</h3>

              <p>{symbol?.toUpperCase()}</p>

              {"current_price" in coin && (
                <span className="price">
                  ${coin.current_price.toLocaleString()}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <p className="selection-count">
        <span>{selectedCoins.length}</span>/5 Selected
      </p>

      <button
        className="save-btn"
        disabled={selectedCoins.length !== 5}
        onClick={saveFavorites}
      >
        Save Favorites
      </button>
    </div>
  );
}

export default Favcoins;
