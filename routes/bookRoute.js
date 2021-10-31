import express from 'express';
import { protect } from '../middleware/auth.js';
import getAllBooks from '../controllers/booksController/getAllBooks.js';
import addNewBook from '../controllers/booksController/addNewBook.js';
import getBookById from '../controllers/booksController/getBookById.js';
import publishBook from '../controllers/booksController/publishBook.js';

/**Swagger doc
 * completed
 * version 0.1
 * 16/09/21 13:29
 * total routes: 0
 * root: /api/books/
 */

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', protect, addNewBook);
router.get('/:id', getBookById);
router.put('/publish', protect, publishBook);

export default router;

/**
 * Change Publish Status
 * @swagger
 * definitions:
 *   publishStatusChange:
 *     required:
 *       - id
 *       - status
 *     properties:
 *       id:
 *         type: string
 *         description: id of the book
 *         example: 617a8d08f563e91682368649
 *       status:
 *         type: string
 *         description: updated status
 *         example: publish
 */

/**
 * Route #1
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     parameters:
 *       - name: genre
 *         description: get books from a specific genre
 *         in: req query url params
 *         type: String
 *       - name: search
 *         description: search for books
 *         in: req query url params
 *         type: String
 *       - name: page
 *         description: page number default 0
 *         in: req query url params
 *         type: Number
 *       - name: type
 *         description: if type is home then data is smaller
 *         in: req query url params
 *         type: String
 *       - name: paid
 *         description: book is paid or not paid=1
 *         in: req query url params
 *         type: String
 *       - name: perpage
 *         description: Number of products per page default 10
 *         in: req query url params
 *         type: Number
 *       - name: sort
 *         description: sort options newest, oldest, nameAsc, nameDsc, popular
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
 * /books:
 *   post:
 *     description: Crete a new book [PROTECT]
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
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *       - name: tags
 *         description: tags which belongs to the book
 *         in: req body
 *         type: Array
 *       - name: genre
 *         description: Book genre
 *         in: req body
 *         required: true
 *         type: String
 *       - name: language
 *         description: Book genre
 *         in: req body
 *         required: true
 *         type: String
 *       - name: type
 *         description: Wheather a book is paid or not
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       500:
 *         description: returns Object - {status:String, msg:String}
 *       201:
 *         description: returns {status:String, book:object} book that has been created
 */

/**
 * Route #3
 * @swagger
 * /books/{id}:
 *   get:
 *     description: Get a book by id
 *     parameters:
 *       - name: id
 *         description: id of the book
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       404:
 *         description: String - error
 *       200:
 *         description: returns book:Object
 */

/**
 * Route #2
 * @swagger
 * /books/publish:
 *   post:
 *     summary: Change publish status
 *     description: Change publish status [PROTECT]
 *     parameters:
 *       - name: token
 *         description: token of the user
 *         in: req header
 *         required: true
 *         type: String
 *       - name: req body
 *         description: Change publish status
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/publishStatusChange"
 *     responses:
 *       500:
 *         description: returns Object {status:String, message:error}
 *       200:
 *         description: returns Object {status:String, doc:Object}
 */
