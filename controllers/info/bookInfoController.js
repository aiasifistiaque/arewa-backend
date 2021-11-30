import Book from '../../models/bookModel.js';
import asyncHandler from 'express-async-handler';

const bookInfoController = asyncHandler(async (req, res) => {
	try {
		const book = await Book.findById(req.params.id)
			.select('author title image description')
			.populate([
				{
					path: 'author',
					select: '_id username image',
				},
			]);

		if (!book) return res.status(404).json({ message: error.message });

		res.status(200).json({ doc: book });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

export default bookInfoController;
