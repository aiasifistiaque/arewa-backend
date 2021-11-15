import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
	{
		books: {
			type: Number,
			required: true,
			dafault: 0,
		},
		chapters: {
			type: Number,
			required: true,
			dafault: 0,
		},
		users: {
			type: Number,
			required: true,
			dafault: 0,
		},
		paidBooks: {
			type: Number,
			dafault: 0,
		},
		authors: {
			type: Number,
			dafault: 0,
		},

		commission: {
			type: Number,
			required: true,
			dafault: 25,
		},
	},
	{
		timestamps: true,
	}
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
