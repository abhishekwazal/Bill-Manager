const { response } = require("express");
const transactionModel = require("../models/TransactionModel.js");
const moment = require("moment");

const addTransaction = async (req, res) => {
  console.log("add transaction");
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransaction = async (req, res) => {
  console.log("edit transaction");
  try {
    await transactionModel.findOneAndUpdate(
      {
        _id: req.body.transactionId,
      },
      req.body.payload
    );
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({_id: req.body.transactionId});
    res.status(200).send({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, status } = req.body;
    const query = {};
    if (frequency !== "custom") {
      query.date = {
        $gt: moment().subtract(Number(frequency), "d").toDate(),
      };
    } else {
      query.date = {
        $gte: selectedDate[0],
        $lte: selectedDate[1],
      };
    }
    if (status === "paid") {
      query.status = "paid";
    } else if (status === "unpaid") {
      query.status = "unpaid";
    }
    const transactions = await transactionModel.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransaction,
};
