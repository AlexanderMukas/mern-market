import express from 'express';
const router = express.Router();

import { 
    authUser, 
    registerUser, 
    getUserProfile, 
    updateUserProfile 
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);

router.post('/login', authUser);



// put middleware on first argument first
router.route('/profile').get(protect, getUserProfile);

router.route('/profile').put(protect, updateUserProfile);

export default router;