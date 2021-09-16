import express from 'express';
import { protect } from '../middleware/auth.js';
import getAllBooks from '../controllers/booksController/getAllBooks.js';
import addNewBook from '../controllers/booksController/addNewBook.js';
import getBookById from '../controllers/booksController/getBookById.js';

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

export default router;

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
 *       - name: page
 *         description: page number default 0
 *         in: req query url params
 *         type: Number
 *       - name: perpage
 *         description: Number of products per page default 10
 *         in: req query url params
 *         type: Number
 *       - name: sort
 *         description: sort options newest, oldest, nameAsc, nameDsc
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
