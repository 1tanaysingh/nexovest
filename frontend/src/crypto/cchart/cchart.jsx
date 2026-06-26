import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
// import "./CryptoChart.css";

function CryptoChart({ id }) {
  const [chartData, setChartData] = useState([]);
  const [Ai, setAi] = useState("");

  useEffect(() => {
    async function fetchChart() {
      try {
        console.log("Crypto ID:", id);

        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
        );

        console.log("Crypto Chart Response:", res.data);

        if (!res.data.prices) {
          console.log("No Crypto Chart Data Found");
          return;
        }

        const formattedData = res.data.prices.map((item) => ({
          date: new Date(item[0]).toLocaleDateString(),
          price: Number(item[1].toFixed(2)),
        }));

        setChartData(formattedData);

        const latest = formattedData[formattedData.length - 1]?.price;
        const old = formattedData[0]?.price;

        const change = ((latest - old) / old) * 100;

        if (change > 10) {
          setAi("🚀 Strong Buy");
        } else if (change > 5) {
          setAi("🟢 Buy");
        } else if (change < -10) {
          setAi("⚠️ Strong Sell");
        } else if (change < -5) {
          setAi("🔴 Sell");
        } else {
          setAi("🟡 Hold");
        }
      } catch (err) {
        console.log("Crypto Chart Error:", err);
      }
    }

    if (id) {
      fetchChart();
    }
  }, [id]);

  const data = {
    labels: chartData.map((item) => item.date),

    datasets: [
      {
        label: `${id} Crypto Price`,
        data: chartData.map((item) => item.price),
        borderColor: "#00d09c",
        backgroundColor: "rgba(0,208,156,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

 return (
  <div className="chart-box">
    <div className="chart-header">
      <h1>{id?.toUpperCase()}</h1>
      <p>30 day crypto price movement</p>
    </div>

    <div className="chart-area">
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>

    <div className="crypto-stats">
      <div className="stat-card">
        <span>Last Price</span>
        <h3>
          $
          {chartData[chartData.length - 1]?.price
            ? chartData[chartData.length - 1].price.toLocaleString()
            : "N/A"}
        </h3>
      </div>

      <div className="stat-card">
        <span>Data Points</span>
        <h3>{chartData.length}</h3>
      </div>

      <div className="stat-card">
        <span>AI Suggestion</span>
        <h3>{Ai || "Loading..."}</h3>
      </div>
    </div>
  </div>
);
}

export default CryptoChart;