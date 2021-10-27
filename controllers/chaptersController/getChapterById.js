import Chapter from '../../models/chapterModel.js';
import asyncHandler from 'express-async-handler';

const getChapterById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const chapter = await Chapter.findById(id).populate({
			path: 'book',
			populate: { path: 'chapters', select: '_id title' },
		});
		res.status(200).json(chapter);
	} catch (error) {
		res.status(404).send(`Chapter #${id} not found`);
	}
});

export default getChapterById;
