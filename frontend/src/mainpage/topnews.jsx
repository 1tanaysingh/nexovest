import axios from "axios";

import { useState, useEffect } from "react";
import "./Topnews.css";
function Topnews({ symbol }) {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const today = new Date();

    const to = today.toISOString().split("T")[0];

    const fromDate = new Date();
    fromDate.setDate(today.getDate() - 60);

    const from = fromDate.toISOString().split("T")[0];
    
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=d8jfn9pr01qh6g3q0cegd8jfn9pr01qh6g3q0cf0`,
        );
        setNews(res.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching news:");
      }
    };

    fetchNews();
  }, [symbol]);

  return (
    <div className="news-container">
      {news.map((item) => (
        <div className="news-card" key={item.id}>
          <img src={item.image} alt="" />

          <h3>{item.headline}</h3>

          <p>{item.summary}</p>

          <a href={item.url} target="_blank" rel="noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
}
export default Topnews;
