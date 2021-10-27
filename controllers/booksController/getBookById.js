import Book from '../../models/bookModel.js';
import asyncHandler from 'express-async-handler';

const getBookById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id).populate([
			{
				path: 'author',
				select: '_id name username',
			},
			{
				path: 'chapters',
				select: '_id title paid',
			},
		]);
		res.status(200).json(book);
	} catch (error) {
		res.status(404).json({ message: `Book #${id} not found` });
	}
});

export default getBookById;
