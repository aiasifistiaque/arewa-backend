import express from 'express';
import { protect } from '../middleware/auth.js';
import followUser from '../controllers/usersController/followUser.js';

/**Swagger doc
 * completed
 * version 0.1
 * 19/09/21 16:12
 * total routes: 0
 * root: /api/followers/
 */

const router = express.Router();

router.post('/', protect, followUser);

export default router;
