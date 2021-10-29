import asyncHandler from 'express-async-handler';
import Withdraw from '../../models/withdrawModel.js';

const myWithdraws = asyncHandler(async (req, res) => {
	const user = req.user._id;

	try {
		const withdraws = await Withdraw.find({ user }).sort('-createdAt');

		return res.status(200).json({ status: 'success', doc: withdraws });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default myWithdraws;
