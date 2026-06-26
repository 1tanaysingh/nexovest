import axios from "axios";
import { useEffect, useState } from "react";

function Cnews({ id }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await axios.get(
          `https://gnews.io/api/v4/search?q=${id}&lang=en&max=5&token=685894d06e58f4e49e5ebfef54d7d6fa`,
        );

        setNews(res.data.articles || []);
      } catch (err) {
        console.log("News Error:", err);
      }
    }

    if (id) {
      fetchNews();
    }
  }, [id]);

  return (
    <div className="crypto-news">
      <div className="news-header">
        <h2>Top News</h2>
        <p>Latest updates about {id}</p>
      </div>

      <div className="news-list">
        {news.slice(0, 5).map((item, index) => (
          <a
            className="news-card"
            key={index}
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            {item.image && <img src={item.image} alt={item.title} />}

            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>{item.source?.name || "Read More"}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Cnews;
