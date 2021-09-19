import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			minlength: 4,
			unique: true,
			trim: true,
		},
		walletBalance: {
			type: Number,
			required: true,
			default: 0,
		},
		earning: {
			type: Number,
			required: true,
			default: 0,
		},
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true,
			trim: true,
		},

		followers: {
			type: Number,
			default: 0,
		},
		followings: {
			type: Number,
			default: 0,
		},

		resetCode: {
			type: String,
		},

		role: { type: String, default: 'user' },
		password: { type: String, required: true, minlength: 5, maxlength: 1024 },
	},
	{
		timestamps: true,
	}
);

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.name, role: this.role },
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

export const User = mongoose.model('User', userSchema);

export function validate(user) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		username: Joi.string().min(4).max(255).required(),
		password: Joi.string().min(5).max(255).required(),
		role: Joi.string(),
	});
	return schema.validate(user);
}
