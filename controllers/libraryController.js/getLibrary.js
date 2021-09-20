import asyncHandler from 'express-async-handler';
import Library from '../../models/libraryModel.js';

const getLibrary = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const option = req.query.sort;

	const user = req.user._id;

	if (option == 'newest') sort = '-createdAt';
	else if (option == 'oldest') sort = 'createdAt';
	else if (option == 'nameAsc') sort = 'name';
	else if (option == 'nameDsc') sort = '-name';

	try {
		const count = await Library.countDocuments({ user: user });
		const books = await Library.find({ user: user })
			.populate([
				{
					path: 'book',
					select: '_id title image author tags genre language rating chapters',
					populate: [
						{ path: 'author', select: 'name' },
						{ path: 'chapters', select: 'title' },
					],
				},
				{ path: 'currentChapter', select: 'title' },
			])
			.sort(sort);

		res.status(200).json({ books, count });
	} catch (e) {
		return res.status(500).send('There was an error');
	}
});

export default getLibrary;
