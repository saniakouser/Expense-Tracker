const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    text: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  });
  const Transaction = mongoose.model('Transaction', transactionSchema);
  module.exports=Transaction;

























