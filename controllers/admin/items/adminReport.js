import asyncHandler from 'express-async-handler';
import Unlock from '../../../models/unlockModel.js';
import Report from '../../../models/reportModel.js';

const adminReport = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const doc = await Report.findById(id);

		if (!doc) {
			return res
				.status(600)
				.json({ status: 'error', message: 'Item not found' });
		}

		res.status(200).json({ doc, status: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default adminReport;
