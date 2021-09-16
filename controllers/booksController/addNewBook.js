import asyncHandler from 'express-async-handler';
import Book from '../../models/bookModel.js';

const addNewBook = asyncHandler(async (req, res) => {
	const {
		title,
		image,
		description,
		tags,
		genre,
		language,
		type,
		rating,
	} = req.body;

	const author = req.user._id;

	try {
		const book = new Book({
			title,
			image,
			description,
			author,
			tags,
			genre,
			language,
			type,
			rating,
		});

		const addBook = await book.save();
		res.status(201).json({ status: 'created', book: addBook });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default addNewBook;
