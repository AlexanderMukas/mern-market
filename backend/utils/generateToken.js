import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    // 30d -> expire 30 days
    return jwt.sign( {id} , process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken;