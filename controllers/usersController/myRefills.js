import asyncHandler from 'express-async-handler';
import Refill from '../../models/refillModel.js';

const myRefills = asyncHandler(async (req, res) => {
	const user = req.user._id;

	try {
		const refills = await Refill.find({ user }).sort('-createdAt');

		return res.status(200).json({ status: 'success', doc: refills });
	} catch (e) {
		return res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default myRefills;
