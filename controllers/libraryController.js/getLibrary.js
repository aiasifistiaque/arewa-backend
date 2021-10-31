import asyncHandler from 'express-async-handler';
import Library from '../../models/libraryModel.js';

const getLibrary = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const option = req.query.sort;

	const user = req.user._id;
	const perPage = parseInt(req.query.perpage) || 10;
	const page = parseInt(req.query.page) - 1 || 0;

	if (option == 'newest') sort = '-createdAt';
	else if (option == 'oldest') sort = 'createdAt';
	else if (option == 'nameAsc') sort = 'name';
	else if (option == 'nameDsc') sort = '-name';

	try {
		const count = await Library.countDocuments({ user: user });
		const pages = Math.ceil(count / perPage);
		const doc = await Library.find({ user: user })
			.populate([
				{
					path: 'book',
					select: '_id title image author tags genre language rating',
					populate: [
						{ path: 'author', select: 'name' },
						{ path: 'chapters', select: 'title' },
					],
				},
				{ path: 'currentChapter', select: 'title' },
			])
			.sort(sort)
			.skip(page * perPage)
			.limit(perPage);

		res.status(200).json({ doc, count, page: page + 1, perPage, pages });
	} catch (e) {
		return res.status(500).json({ message: 'There was an error' });
	}
});

export default getLibrary;
