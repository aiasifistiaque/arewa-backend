import express from 'express';
import { protect } from '../middleware/auth.js';
import addNewComment from '../controllers/commentsController.js/addNewComment.js';
import getComments from '../controllers/commentsController.js/getComments.js';

/**Swagger doc
 * completed
 * version 0.1
 * 16/09/21 13:29
 * total routes: 0
 * root: /api/books/
 */

const router = express.Router();

router.get('/', getComments);
router.post('/', protect, addNewComment);
// router.get('/:id', getBookById);

export default router;

/**
 * Route #1
 * @swagger
 * /comments:
 *   get:
 *     description: Get all comments from a book or chapter
 *     parameters:
 *       - name: type
 *         description: values - chapter or book, default book
 *         in: req query url params
 *         type: String
 *       - name: id
 *         description: id of the chapter or book
 *         required: true
 *         in: req query url params
 *         type: String
 *       - name: page
 *         description: page number default 0
 *         in: req query url params
 *         type: Number
 *       - name: perpage
 *         description: Number of products per page default 10
 *         in: req query url params
 *         type: Number
 *       - name: sort
 *         description: sort options newest, oldest
 *         in: req query url params
 *         type: string
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns Object {books:Array, total:total Results, perPage:Results per page, page:Current Page, totalPages:Total Number of pages}
 */

/**
 * Route #2
 * @swagger
 * /comments:
 *   post:
 *     description: Crete a new comment on book or chapter [PROTECT]
 *     parameters:
 *       - name: comment
 *         description: Comment that is to be posted
 *         in: req body
 *         required: true
 *         type: String
 *       - name: book
 *         description: id of the book
 *         in: req body
 *         required: true
 *         type: _id
 *       - name: chapter
 *         description: id of the chapter
 *         in: req body
 *         type: _id
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *     responses:
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, doc:object} comment that has been created
 */
