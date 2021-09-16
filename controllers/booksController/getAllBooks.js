import Book from '../../models/bookModel.js';
import asyncHandler from 'express-async-handler';
import { books } from '../../constants.js';

const getAllBooks = asyncHandler(async (req, res) => {
	//const { sort, page, perPage } = req.body;

	let sort = books.sort;
	const option = req.query.sort;
	const perPage = parseInt(req.query.perpage) || books.perpage;
	const page = parseInt(req.query.page) - 1 || 0;

	let genre = req.query.genre ? { genre: req.query.genre } : {};

	if (option == 'newest') sort = '-createdAt';
	else if (option == 'oldest') sort = 'createdAt';
	else if (option == 'nameAsc') sort = 'name';
	else if (option == 'nameDsc') sort = '-name';

	try {
		const count = await Book.countDocuments(genre);
		const totalPages = Math.ceil(count / perPage);
		const books = await Book.find(genre)
			.sort(sort)
			.skip(page * perPage)
			.limit(perPage);
		res.status(200).json({ books, count, perPage, page: page + 1, totalPages });
	} catch (e) {
		console.log(e);
		return res.status(500).send('There was an error');
	}
});

export default getAllBooks;
