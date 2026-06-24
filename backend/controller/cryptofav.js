import Favcrypto from "../models/favcrypto.js";

export const saveFavcrypto = async (req, res) => {
  try {
    const userId = req.userId;
    const { cryptoIds } = req.body;

    if (!cryptoIds || cryptoIds.length !== 5) {
      return res.status(400).json({
        message: "Please select exactly 5 coins",
      });
    }

    const favcrypto = await Favcrypto.findOneAndUpdate(
      { userId },
      {
        userId,
        cryptoid1: cryptoIds[0],
        cryptoid2: cryptoIds[1],
        cryptoid3: cryptoIds[2],
        cryptoid4: cryptoIds[3],
        cryptoid5: cryptoIds[4],
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Favorites saved successfully",
      favcrypto,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error saving favorites",
    });
  }
};