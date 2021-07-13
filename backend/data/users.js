import bcrypt from 'bcryptjs';

// some simple users for MongoDB database
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Alex Ivanov',
        email: 'a.ivanov@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Natalia Shevchenko',
        email: 'n.shevchenko@example.com',
        password: bcrypt.hashSync('123456', 10)
    }

];

export default users;