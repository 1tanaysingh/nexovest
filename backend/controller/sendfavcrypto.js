import Favcrypto from "../models/favcrypto.js";

export const sendFavCrypto = async (req, res) => {
  try {
    const userId = req.userId;

    const favcrypto = await Favcrypto.findOne({ userId });

    if (!favcrypto) {
      return res.status(404).json({
        success: false,
        message: "No favourite crypto found",
      });
    }

    res.status(200).json({
      success: true,
      cryptoid1: favcrypto.cryptoid1,
      cryptoid2: favcrypto.cryptoid2,
      cryptoid3: favcrypto.cryptoid3,
      cryptoid4: favcrypto.cryptoid4,
      cryptoid5: favcrypto.cryptoid5,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};