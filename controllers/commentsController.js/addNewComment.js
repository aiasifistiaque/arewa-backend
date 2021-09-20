import asyncHandler from 'express-async-handler';
import Comment from '../../models/commentModel.js';

const addNewComment = asyncHandler(async (req, res) => {
	const { comment, book, chapter } = req.body;
	const user = req.user._id;

	try {
		const newComment = new Comment({
			user,
			comment,
			book,
			chapter,
		});

		const addComment = await newComment.save();
		res.status(201).json({ status: 'created', doc: addComment });
	} catch (e) {
		res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default addNewComment;
