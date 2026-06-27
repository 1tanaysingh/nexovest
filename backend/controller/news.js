import axios from "axios";

export const getNews = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=${id}&lang=en&max=5&token=${process.env.GNEWS_API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
};
