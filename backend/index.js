const express = require('express');
const bodyParser = require('body-parser');
const Transaction = require('./models/transac.js');
const connection = require("./db.js");
const cors = require("cors");
connection();

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' }); 
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/api/transactions', async (req, res) => {
  try {
    const { text, amount } = req.body;
    const newTransaction = new Transaction({ text, amount });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
