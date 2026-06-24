import React, { useEffect, useState } from "react";
import axios from "axios";
import "./autofill.css";

function Autofill() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function getData() {
      if (search === "") {
        setCoins([]);
        return;
      }

      let res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );

      setCoins(res.data.coins);
    }

    getData();
  }, [search]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search coin"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="box">
        {coins.map((coin) => {
          return (
            <p key={coin.id}>
              {coin.name} ({coin.symbol})
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Autofill;