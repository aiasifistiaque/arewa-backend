import Book from '../../models/bookModel.js';
import asyncHandler from 'express-async-handler';

const getBookById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;
	let viewer = 'reader';
	try {
		const book = await Book.findById(id).populate([
			{
				path: 'author',
				select: '_id name username image',
			},
			{
				path: 'chapters',
				select: '_id title paid status earned',
			},
		]);
		if (book.author._id == userId) {
			viewer = 'self';
		}

		book.views = book.views ? book.views + 1 : 1;
		await book.save();

		res.status(200).json({ doc: book, viewer });
	} catch (error) {
		res.status(404).json({ message: `Book #${id} not found` });
	}
});

export default getBookById;
