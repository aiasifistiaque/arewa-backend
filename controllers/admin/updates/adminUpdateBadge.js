import asyncHandler from 'express-async-handler';
import { User } from '../../../models/userModel.js';

const adminUpdateBadge = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { badge } = req.body;
	try {
		const item = await User.findById(id);

		if (!item) {
			return res
				.status(500)
				.json({ status: 'error', message: 'User not found' });
		}

		item.badge = badge;

		const doc = await item.save();

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminUpdateBadge;
