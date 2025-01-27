// DEFINE CUSTOMER SCHEMA
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: String,
    age : Number,
  });
  

// COMPILE CUSTOMER SCHEMA INTO A MODEL 
const Customer = mongoose.model('Customer', customerSchema);


// EXPORT CUSTOMER MODEL
module.exports = Customer;

