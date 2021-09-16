import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: true,
			trim: true,
			default:
				'https://images.pexels.com/photos/4210782/pexels-photo-4210782.jpeg',
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		chapters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'Chapter',
			},
		],
		tags: [],
		genre: { type: String, required: true, trim: true },
		language: { type: String, required: true, trim: true },
		type: { type: String, required: true, trim: true, default: 'free' },
		rating: {
			type: String,
			required: true,
			default: 'All',
		},
	},
	{
		timestamps: true,
	}
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
