import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema(
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
			trim: true,
		},
		book: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Book',
		},
		likes: {
			type: Number,
			required: true,
			default: 0,
		},
		paid: { type: Boolean, required: true, default: false },
		price: { type: Number, required: true, defult: 0 },
	},
	{
		timestamps: true,
	}
);

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
