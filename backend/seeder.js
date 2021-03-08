// seeder (наполнитель бд) - filling data into database
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// add colors.js
import colors from 'colors';

//add to dbase users and products data
import users from './data/users.js';
import products from './data/products.js';

//add to dbase order, product and user models
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // delete all data from db
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        //testing
        console.log(createdUsers + ' !!!users')
        // const adminUser = createdUsers.find(user => user.isAdmin === true)

        const adminUser = createdUsers[0]._id   // first item IS ADMIN

        const sampleProducts = products.map( product => {
            return { ...product, user: adminUser }
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit()


    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        // delete all data from db
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();


        console.log('Data Destroyed!'.red.inverse);
        process.exit()


    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

// add argument key : " node backend/seeder.js -D "
if(process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}