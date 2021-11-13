import asyncHandler from 'express-async-handler';
import { User } from '../../../models/userModel.js';
import Book from '../../../models/bookModel.js';
import Withdraw from '../../../models/withdrawModel.js';
import Unlock from '../../../models/unlockModel.js';

const adminUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const doc = await User.findById(id).select('-password');

		if (!doc) {
			return res
				.status(600)
				.json({ status: 'error', message: 'User not found' });
		}

		const books = await Book.find({ author: id });
		const withdraws = await Withdraw.find({ user: id }).sort('-createdAt');
		const refills = await Withdraw.find({ user: id }).sort('-createdAt');
		const unlocks = await Unlock.find()
			.sort('-createdAt')
			.populate([
				{ path: 'user', select: 'name' },
				{ path: 'book', select: 'title image' },
				{ path: 'chapter', select: 'title' },
				{ path: 'author', select: 'name username' },
			]);

		res
			.status(200)
			.json({ doc, status: 'success', books, withdraws, refills, unlocks });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminUser;
