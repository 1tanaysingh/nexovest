import FavStock from "../models/favstocks.js";

export const saveFavStocks = async (req, res) => {
  try {
    const userId = req.userId;
    const { stockIds } = req.body;

    if (!stockIds || stockIds.length === 0 || stockIds.length > 5) {
      return res.status(400).json({
        message: "Please select 1-5 stocks",
      });
    }

    await FavStock.findOneAndUpdate(
      { userId },
      {
        userId,
        stockIds,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json({
      message: "Stocks saved successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};