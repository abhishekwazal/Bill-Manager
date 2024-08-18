const express = require("express");
const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransaction,
} = require("../controllers/transactionController.js");

const router = express.Router();

router.post("/add-transactions", addTransaction);
router.post("/edit-transactions", editTransaction);
router.post("/delete-transactions", deleteTransaction);
router.get("/get-transactions", getTransaction);

module.exports = router;
