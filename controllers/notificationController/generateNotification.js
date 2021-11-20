import Notification from '../../models/notificationModel.js';

const generateNotification = async ({ user, details, image, type, target }) => {
	try {
		const notification = new Notification({
			user: user,
			details: details,
			image: image ? image : '/icon.png',
			type: type,
			target: target,
			seen: false,
		});
		const created = await notification.save();
		console.log('New Notification generated', created);
	} catch (e) {
		console.log(e);
	}
};

export default generateNotification;
