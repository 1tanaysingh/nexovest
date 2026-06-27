export const getNews = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${id}&lang=en&max=5&token=${process.env.GNEWS_API_KEY}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
};
