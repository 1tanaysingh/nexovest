import mongoose from "mongoose";

const FavCryptoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  cryptoid1:{
    type: String,
  },
  cryptoid2:{
    type: String,
  },
  cryptoid3:{
    type: String,
  },
  cryptoid4:{
    type: String,
  },
  cryptoid5:{
    type: String,
  }
});

export default mongoose.model("FavCrypto", FavCryptoSchema);