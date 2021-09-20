import asyncHandler from 'express-async-handler';
import Library from '../../models/libraryModel.js';
import Book from '../../models/bookModel.js';

const addToLibrary = asyncHandler(async (req, res) => {
	const { book, status } = req.body;

	try {
		const bookToAdd = await Book.findById(book);

		if (!bookToAdd) {
			return res.status(404).json({ status: 'error', msg: 'Book Not Found' });
		}

		const ifExist = await Library.findOne({
			user: req.user._id,
			book: book,
		});

		if (ifExist) {
			return res
				.status(500)
				.json({ status: 'error', msg: 'Book Already Exists in your library' });
		} else {
			const libraryItem = new Library({
				user: req.user._id,
				book,
				status: status || 'Added',
				currentChapter: bookToAdd.chapters[0],
			});

			const addedItem = await libraryItem.save();
			res.status(201).json({ status: 'created', book: addedItem });
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', msg: e.message });
	}
});

export default addToLibrary;
