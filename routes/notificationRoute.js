import express from 'express';
import { protect } from '../middleware/auth.js';
import getAllNotifications from '../controllers/notificationController/getAllNotifications.js';
import { sort } from '../middleware/sort.js';

/**Swagger doc
 * completed
 * version 0.1
 * 19/09/21 16:12
 * total routes: 3
 * root: /api/follow/
 */

const router = express.Router();

router.get('/', protect, sort, getAllNotifications);

export default router;

/**
 * Route #1
 * @swagger
 * /notifications:
 *   get:
 *     description: Get all Notifications
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: sort
 *         description: sort
 *         in: req query url params
 *         type: string
 *       - name: page
 *         description: sopagert
 *         in: req query url params
 *         type: string
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {}
 */
