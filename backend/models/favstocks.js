import mongoose from "mongoose";

const FavStockSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  stockIds: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length <= 5;
      },
      message: "Maximum 5 favorite stocks allowed",
    },
  },
});

export default mongoose.model(
  "FavStock",
  FavStockSchema
);