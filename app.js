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
    
};



const disconnect = async () => {
    await mongoose.disconnect();
    console.log('Disconnect to MongoDB');
    process.exit()

};

///new function
const welcome = () => {
console.log('Welcome to your favorite CRM!');
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
    const customers = await Customer.find({})
    customers.forEach((customer) => {
        console.log(` id: ${customer._id} Name: ${customer.name} Age: ${customer.age}`);
    });
    
};

//function 3 update
const updateCustomers = async () => {
    console.log('Below is a list of customers');
    await viewCustomers();
    const id = prompt('Copy and paste the id of the customer you want to update here:');
    const name = prompt(`What is the customers new name?`);
    const age = prompt(`What is the customers new age?`);

    const customer = await Customer.findByIdAndUpdate(
        id, 
        {
           ... (name ? {name} : {}),
            age: age || customer.age,
        },
        { new: true }
    );
        
        console.log(`Updated user:`, customer); 
};

// function 4 delete
const deleteCustomers = async () => {
    await viewCustomers();
    const id = prompt('Copy and paste the id of the customer you want to update here');
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    console.log(`Deleted Customer:`, deletedCustomer);
}

// function invocation
await connect();




while(true) {
 const answer = welcome();
if(answer === '5') await disconnect(); //5
if(answer === '1') await createCustomer(); //1
if(answer === '2') await viewCustomers(); //2
if(answer === '3') await updateCustomers(); //3
if(answer === '4') await deleteCustomers(); //4




}


};

main();




// prompt dependecy

// const username = prompt('What is your name?'); // sends a prompt to ask the user there name

// console.log(`Your name is ${username}`); // Once the user enters there name it logs this





