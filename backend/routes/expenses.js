const express = require("express");
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpenseStats,
} = require("../controllers/expenseController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth); // All expense routes require authentication

router.post("/", createExpense);
router.get("/", getExpenses);
router.get("/stats", getExpenseStats);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
