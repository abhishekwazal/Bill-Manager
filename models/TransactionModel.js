const { mongoose, Schema } = require("mongoose");

const transactionSchema = new Schema(
  {
    product: {
      type: String,
    },
    quantity: {
      type: String,
    },
    amount: {
      type: String,
      required: [true, "amount is required"],
    },
    status: {
      type: String,
      required: [true, "status is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    date: {
      type: String,
      required: [true, "date is required"],
    },
    description: {
      type: String,
    },
    invoice: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
