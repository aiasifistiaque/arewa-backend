import asyncHandler from 'express-async-handler';
import Book from '../../../models/bookModel.js';

const adminBanBook = asyncHandler(async (req, res) => {
	const { type, status } = req.body;
	const { id } = req.params;
	try {
		const book = await Book.findById(id).populate();

		if (!book) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Book not found' });
		}

		if (type == 'editor') {
			book.choice = 'editor';
		} else if (type == 'status') {
			book.status = status;
		} else {
			book.status = 'banned';
		}

		const doc = await book.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminBanBook;
