//DEPENDENCIES
// dotenv depe
const dotenv = require('dotenv');
dotenv.config();

const prompt = require('prompt-sync')();

// mongoosse dependency
const mongoose = require('mongoose');

// Customer dependency 
const Customer = require('./models/customer.js');

const main = async () => {
    //functions
    const connect = async () => {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    
}



const disconnect = async () => {
    await mongoose.disconnect();
    console.log('Disconnect to MongoDB');
    process.exit()

};

///new function
const welcome = () => {
console.log(`What would you like to do?
1. Create a customer
2. View all customers
3. Update a customer
4. Delete a customer
5. quit`);

const response = prompt('Number of action to run:\n')

console.log(response);
return response;
};

// function 1 create
const createCustomer = async () => {
 const name = prompt(`What is the new customer's name?`);
 const age = prompt(`What is the new customer's age?`);
 const customer = await Customer.create({
    name,
    age: parseInt(age), // convert age into a string
 });
 console.log(`You created:`, customer);
};

//function 2 view 
const viewCustomers = async () => {
    const customer = await Customer.find({})
    console.log(`These are the customer(s):`, customer);
};

//function 3 update
const updateCustomers = async () => {
    const id = '6796e5dd6a0333cfab141fd4'
    const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
    Customer,
    {new: true},
);

    
    
   console.log('Updated customer:', updatedCustomer)
}

// function invocation
await connect();
console.log('Welcome to your favorite CRM!');



while(true) {
 const answer = welcome();
if (answer === '5') await disconnect();
if(answer === '1') await createCustomer();
if(answer === '2') await viewCustomers();
if(answer === '3') await updateCustomers();
if(answer === '4') await deleteCustomers();




}


};

main();




// prompt dependecy

// const username = prompt('What is your name?'); // sends a prompt to ask the user there name

// console.log(`Your name is ${username}`); // Once the user enters there name it logs this





