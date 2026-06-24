import axios from "axios";
import { useState, useEffect } from "react";
import "./famous.css"; // ya jo bhi tera css file name hai

function Famous() {
  const [appdata, setAppData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amazonData, setAmazonData] = useState([]);
  const [nvdaData, setNvdaData] = useState([]);
  const [googleData, setGoogleData] = useState([]);
  const [metaData, setMetaData] = useState([]);

  const API_KEY = "GsjYhMkRn5wv0OPw8xens4cWuK2G0bEI";

  useEffect(() => {
    async function fetchData() {
      const appledata = await axios.get(
        `https://financialmodelingprep.com/stable/quote?symbol=AAPL&apikey=${API_KEY}`
      );
      setAppData(appledata.data);
    }

    async function fetchAmazonData() {
      const amazonData = await axios.get(
        `https://financialmodelingprep.com/stable/quote?symbol=AMZN&apikey=${API_KEY}`
      );
      setAmazonData(amazonData.data);
    }

    async function fetchNvdaData() {
      const nvdaData = await axios.get(
        `https://financialmodelingprep.com/stable/quote?symbol=NVDA&apikey=${API_KEY}`
      );
      setNvdaData(nvdaData.data);
    }

    async function fetchGoogleData() {
      const googleData = await axios.get(
        `https://financialmodelingprep.com/stable/quote?symbol=GOOGL&apikey=${API_KEY}`
      );
      setGoogleData(googleData.data);
    }

    async function fetchMetaData() {
      const metaData = await axios.get(
        `https://financialmodelingprep.com/stable/quote?symbol=META&apikey=${API_KEY}`
      );
      setMetaData(metaData.data);
    }

    // Sab ek saath fetch, aur jab sab ho jaaye tab loading false
    async function fetchAll() {
      await Promise.all([
        fetchData(),
        fetchAmazonData(),
        fetchNvdaData(),
        fetchGoogleData(),
        fetchMetaData(),
      ]);
      setLoading(false);
    }

    fetchAll();
  }, []);

 return (
  <>
    {loading ? (
      <div className="ticker-loading">
        Loading market data...
      </div>
    ) : (
      <section className="ticker-section">
        <h2>Market Overview</h2>

        <div className="ticker-scroll-wrapper">
          <div className="ticker-track">

            {appdata[0] && (
              <div className="ticker-card">
                <h3>{appdata[0].symbol}</h3>
                <p>${appdata[0].price?.toFixed(2)}</p>

                <span
                  className={
                    appdata[0].changesPercentage >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {appdata[0].changesPercentage >= 0
                    ? "▲"
                    : "▼"}

                  {" "}
                  {Math.abs(
                    appdata[0].changesPercentage
                  ).toFixed(2)}%
                </span>
              </div>
            )}

            {nvdaData[0] && (
              <div className="ticker-card">
                <h3>{nvdaData[0].symbol}</h3>
                <p>${nvdaData[0].price?.toFixed(2)}</p>

                <span
                  className={
                    nvdaData[0].changesPercentage >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {nvdaData[0].changesPercentage >= 0
                    ? "▲"
                    : "▼"}

                  {" "}
                  {Math.abs(
                    nvdaData[0].changesPercentage
                  ).toFixed(2)}%
                </span>
              </div>
            )}

            {amazonData[0] && (
              <div className="ticker-card">
                <h3>{amazonData[0].symbol}</h3>
                <p>${amazonData[0].price?.toFixed(2)}</p>

                <span
                  className={
                    amazonData[0].changesPercentage >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {amazonData[0].changesPercentage >= 0
                    ? "▲"
                    : "▼"}

                  {" "}
                  {Math.abs(
                    amazonData[0].changesPercentage
                  ).toFixed(2)}%
                </span>
              </div>
            )}

            {googleData[0] && (
              <div className="ticker-card">
                <h3>{googleData[0].symbol}</h3>
                <p>${googleData[0].price?.toFixed(2)}</p>

                <span
                  className={
                    googleData[0].changesPercentage >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {googleData[0].changesPercentage >= 0
                    ? "▲"
                    : "▼"}

                  {" "}
                  {Math.abs(
                    googleData[0].changesPercentage
                  ).toFixed(2)}%
                </span>
              </div>
            )}

            {metaData[0] && (
              <div className="ticker-card">
                <h3>{metaData[0].symbol}</h3>
                <p>${metaData[0].price?.toFixed(2)}</p>

                <span
                  className={
                    metaData[0].changesPercentage >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {metaData[0].changesPercentage >= 0
                    ? "▲"
                    : "▼"}

                  {" "}
                  {Math.abs(
                    metaData[0].changesPercentage
                  ).toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    )}
  </>
);
}

export default Famous;