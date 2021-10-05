import mongoose from 'mongoose';
import { trimEnd } from 'lodash';

const refillSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		details: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			trim: true,
			lowercase: true,
		},
		target: {
			type: String,
			required: true,
			trim: true,
		},
		from: { type: String },
		seen: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
	}
);

const Refill = mongoose.model('Refill', refillSchema);

export default Refill;
