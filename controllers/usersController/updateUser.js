import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const updateUser = asyncHandler(async (req, res) => {
	const id = req.user._id;
	const { image, name, description, email, username } = req.body;
	try {
		const user = await User.findById(id).select('-password');
		if (image) user.image = image;
		if (name) user.name = name;
		if (description) user.description = description;
		if (username) user.username = username;
		if (email) user.email = email;

		const doc = await user.save();
		return res.status(200).json({ status: 'success', doc });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default updateUser;
