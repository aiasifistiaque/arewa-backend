import express from 'express';
import { protect } from '../middleware/auth.js';
import addNewChapter from '../controllers/chaptersController/addNewChapter.js';
import getChapterById from '../controllers/chaptersController/getChapterById.js';

/**Swagger doc
 * completed
 * version 0.1
 * 17/09/21 13:06
 * total routes: 0
 * root: /api/chapters/
 */

const router = express.Router();

router.post('/', protect, addNewChapter);
router.get('/:id', getChapterById);

export default router;

/**
 * Route #1
 * @swagger
 * /chapters:
 *   post:
 *     description: Crete a new chapter [PROTECT]
 *     parameters:
 *       - name: title
 *         description: Title of the book
 *         in: req body
 *         required: true
 *         type: String
 *       - name: image
 *         description: link to the Cover image of book
 *         in: req body
 *         required: true
 *         type: String
 *       - name: description
 *         description: A short description of the book
 *         in: req body
 *         required: true
 *         type: String
 *       - name: book
 *         description: id of the book
 *         in: req body
 *         required: true
 *         type: ID
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *       - name: paid
 *         description: Wheather a book is paid or not
 *         in: req body
 *         required: true
 *         type: Boolean
 *       - name: price
 *         description: price of the book if paid default 0
 *         in: req body
 *         required: true
 *         type: Number
 *     responses:
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, chapter:object} chapter that has been created
 */

/**
 * Route #3
 * @swagger
 * /chapters/{id}:
 *   get:
 *     description: Get a chapter by id
 *     parameters:
 *       - name: id
 *         description: id of the chapter
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       404:
 *         description: String - error
 *       200:
 *         description: returns chapter:Object
 */
