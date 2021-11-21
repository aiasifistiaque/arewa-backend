import express from 'express';
import passport from 'passport';
import { User } from '../models/userModel.js';

const router = express.Router();

router.get('/', passport.authenticate('google'));
router.get(
	'/callback',
	passport.authenticate('google', {
		assignProperty: 'federatedUser',
		failureRedirect: `${process.env.FRONTEND_DOMAIN}/login`,
	}),
	async (req, res) => {
		try {
			const profile = req.federatedUser;
			const user = await User.findOne({ providerId: profile.id });
			if (!user) {
				const newUser = new User({
					name: profile.displayName,
					image: profile.photos[0]?.value,
					username: profile.id,
					provider: 'facebook',
					providerId: profile.id,
					//password: accessToken,
					email: profile.email ? profile.email : null,
					providerToken: req.query.code,
				});
				const created = await newUser.save();
				console.log('New User created');
				res.redirect(`${process.env.FRONTEND_DOMAIN}/register`);
			} else {
				console.log('User already Exists');
				user.providerToken = req.query.code;
				await user.save();
				res.redirect(
					`${process.env.FRONTEND_DOMAIN}/auth/social?provider_id=${profile.id}&code=${req.query.code}`
				);
			}
		} catch (e) {
			console.log(e.message);
		}
	}
);

router.post('/verify', async (req, res) => {
	console.log(req.body);
	try {
		const user = await User.findOne({
			providerId: req.body.provider_id,
			providerToken: req.body.code,
		});
		if (!user) {
			console.log('user not found');
			return res.status(500).json({ message: 'login invalid' });
		}
		console.log(user);
		const token = user.generateAuthToken();
		res.status(200).send(`Bearer ${token}`);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

export default router;