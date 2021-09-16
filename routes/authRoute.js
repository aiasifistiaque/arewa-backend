import { User, validate } from '../models/userModel.js';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const router = express.Router();

//const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.post('/login', async (req, res) => {
	const { error } = loginValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('email id does not exist');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) res.status(400).send('wrong password');

	try {
		const token = user.generateAuthToken();
		res.status(200).send(`Bearer ${token}`);
	} catch {
		e => console.log(e);
	}
});

router.post('/register', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('user already registered..');

	let usernameExists = await User.findOne({ email: req.body.username });
	if (usernameExists) return res.status(400).send('username already in use..');

	user = new User(
		_.pick(req.body, ['name', 'email', 'username', 'password', 'role'])
	);
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	try {
		await user.save();

		const token = user.generateAuthToken();
		res
			.status(200)
			.header('x-auth-token', token)
			.send(_.pick(user, ['_id', 'name', 'email', 'role']));
	} catch (e) {
		res.status(500).send(e);
	}
});

function loginValidate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

export default router;

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: User login route
 *     parameters:
 *       - name: email
 *         in: req body
 *         required: true
 *         type: string
 *       - name: password
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: String - token
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Sign up/Register a new user
 *     parameters:
 *       - name: name
 *         in: req body
 *         required: true
 *         type: string
 *       - name: email
 *         in: req body
 *         required: true
 *         type: string
 *       - name: username
 *         in: req body
 *         required: true
 *         type: string
 *       - name: password
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {user} and token in header
 */
