//simple middleware
// app.use( (req, res, next) => {
//     // console.log('HELLO');
//     console.log(req.originalUrl);
//     next();
// });

//validate the token
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'

const protect = asyncHandler( async (req, res, next) => {
    let token;
    
    if( 
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer') 
    ) {
        try {
            token = (req.headers.authorization).split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // console.log(decoded); // { id: '6047da4cd853c880e2c69e22', iat: 1617023926, exp: 1619615926 }
            req.user = await User.findById( decoded.id ).select('-password');
            next();

        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
            
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        // console.log(req.user);
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export { protect, admin };