import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import Follow from '../../models/followerModel.js';

const followUser = asyncHandler(async (req, res) => {
	const { id } = req.body;

	try {
		const follow = new Follow({
			user: req.user._id,
			following: id,
		});

		const user = await User.findById(req.user._id);
		const toFollow = await User.findById(id);

		const ifFollowerExists = await Follow.findOne({
			user: req.user._id,
			following: id,
		});

		if (!toFollow || !user) {
			return res.status(404).json({ status: 'error', msg: 'user not found' });
		} else {
			if (!ifFollowerExists) {
				const newFollow = await follow.save();
				if (newFollow) {
					user.followings = user.following + 1;
					toFollow.followers = toFollow.followers + 1;
					await user.save();
					await toFollow.save();
				}
				return res.status(201).json({
					status: 'created',
					doc: newFollow,
					user,
					follower: toFollow,
				});
			} else {
				return res
					.status(500)
					.json({ status: 'error', msg: 'you already follow this user' });
			}
		}
	} catch (e) {
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default followUser;