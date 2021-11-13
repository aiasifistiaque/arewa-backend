import asyncHandler from 'express-async-handler';
import Chapter from '../../../models/chapterModel.js';

const adminBanChapter = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const item = await Chapter.findById(id);

		if (!item) {
			return res
				.status(500)
				.json({ status: 'error', message: 'Item not found' });
		}

		item.status = 'banned';

		const doc = await item.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminBanChapter;
