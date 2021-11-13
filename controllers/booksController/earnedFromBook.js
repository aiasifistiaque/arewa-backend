import asyncHandler from 'express-async-handler';
import Unlock from '../../models/unlockModel.js';
import Book from '../../models/bookModel.js';

const earnedFromBook = asyncHandler(async (req, res) => {
	const { id } = req.params;
	let earned = 0;

	try {
		const doc = await Book.findById(id);
		if (!doc) return res.status(500).json({ message: 'Book not found' });

		const count = await Unlock.countDocuments({ book: id }).populate();
		const items = await Unlock.find({ book: id }).select('price createdAt');

		items.map(i => (earned += i.price));

		res
			.status(200)
			.json({
				status: 'success',
				doc,
				earned: (earned * 80) / 100,
				sales: count,
			});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default earnedFromBook;
