import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./StockChart.css";

function StockChart({ symbol }) {
  const [chartData, setChartData] = useState([]);
  const [Ai, setAi] = useState("");

  useEffect(() => {
    async function fetchChart() {
      try {
        console.log("Symbol:", symbol);

        const res = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=VM1GYS29ESN0HNBA`
        );

        console.log("Response:", res.data);

        const series =
          res.data["Time Series (Daily)"];

        if (!series) {
          console.log(
            "No Time Series Data Found"
          );
          return;
        }

        const formattedData = Object.entries(
          series
        )
          .slice(0, 30)
          .reverse()
          .map(([date, value]) => ({
            date,
            price: Number(
              value["4. close"]
            ),
          }));

        setChartData(formattedData);

        const latest =
          formattedData[
            formattedData.length - 1
          ]?.price;

        const old =
          formattedData[0]?.price;

        const change =
          ((latest - old) / old) * 100;

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
        console.log(
          "Chart Error:",
          err
        );
      }
    }

    if (symbol) {
      fetchChart();
    }
  }, [symbol]);

  const data = {
    labels: chartData.map(
      (item) => item.date
    ),

    datasets: [
      {
        label: `${symbol} Stock Price`,
        data: chartData.map(
          (item) => item.price
        ),
        borderColor: "#00d09c",
        backgroundColor:
          "rgba(0,208,156,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={data} />

      <div className="stock-info">
        <p>
          Last Price: ₹
          {
            chartData[
              chartData.length - 1
            ]?.price
          }
        </p>

        <p>
          Data Points:
          {chartData.length}
        </p>

        <p>
          AI Suggestion:
          {" "}
          {Ai}
        </p>
      </div>
    </div>
  );
}

export default StockChart;