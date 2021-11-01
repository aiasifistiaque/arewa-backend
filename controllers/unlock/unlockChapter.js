import Chapter from '../../models/chapterModel.js';
import asyncHandler from 'express-async-handler';
import Unlock from '../../models/unlockModel.js';
import { User } from '../../models/userModel.js';

const unlockChapter = asyncHandler(async (req, res) => {
	const { id } = req.body;
	const userId = req.user._id;

	try {
		const doesExist = await Unlock.findOne({ chapter: id, user: userId });
		if (doesExist) {
			return res
				.status(500)
				.json({ message: 'You have already purchased this chapter' });
		} else {
			const chapter = await Chapter.findById(id).populate({
				path: 'book',
				populate: { path: 'chapters', select: '_id author' },
			});
			if (!chapter) {
				return res.status(404).json({ message: 'Chapter not found' });
			}
			if (chapter.paid != true) {
				return res.status(500).json({ message: 'Chapter is not for sale' });
			}
			if (chapter.book.author == userId) {
				return res
					.status(500)
					.json({ message: 'You can not buy your own book' });
			}

			const buyer = await User.findById(userId);
			if (!buyer) {
				return res.status(404).json({ message: 'User not found' });
			}

			if (buyer && buyer.walletBalance < chapter.price) {
				return res.status(500).json({ message: 'Not enough balance' });
			} else {
				const unlock = new Unlock({
					chapter: id,
					book: chapter.book._id,
					author: chapter.book.author,
					price: chapter.price,
					user: buyer._id,
				});
				const created = await unlock.save();
				if (created) {
					buyer.walletBalance = buyer.walletBalance - chapter.price;
					await buyer.save();
					return res.status(201).json({ doc: created });
				} else {
					res.status(500).json({ message: 'Could not be added' });
				}
			}
		}
	} catch (error) {
		res.status(500).json({ message: 'Could not be added' });
	}
});

export default unlockChapter;
