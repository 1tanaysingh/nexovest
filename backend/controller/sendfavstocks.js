import FavStock from "../models/favstocks.js";

export const sendFavStocks = async (req, res) => {
  try {
    const userId = req.userId;

    const favstocks = await FavStock.findOne({ userId });

    if (!favstocks) {
      return res.status(404).json({
        success: false,
        message: "No favourite stocks found",
      });
    }

    return res.status(200).json({
      success: true,
      stockIds: favstocks.stockIds,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};