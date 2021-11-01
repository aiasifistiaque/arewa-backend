import asyncHandler from 'express-async-handler';
import Unlock from '../../models/unlockModel.js';

const myUnlocks = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	try {
		const unlocks = await Unlock.find({ user: userId })
			.populate([
				{ path: 'chapter', select: '_id title' },
				{ path: 'book', select: '_id title image' },
				{ path: 'author', select: '_id name' },
			])
			.sort('-createdAt');
		res.status(200).json({ doc: unlocks });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default myUnlocks;
