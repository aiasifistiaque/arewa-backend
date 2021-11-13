import { admin, protect } from '../middleware/auth.js';
import express from 'express';
import adminGetUsers from '../controllers/admin/adminGetUsers.js';
import { sort } from '../middleware/sort.js';
import adminRefillRequests from '../controllers/admin/adminRefillRequests.js';
import adminWithdrawRequests from '../controllers/admin/adminWithdrawRequest.js';
import adminPaidBooks from '../controllers/admin/adminPaidBooks.js';
import adminUnlocks from '../controllers/admin/adminUnlocks.js';
import earnedFromBook from '../controllers/booksController/earnedFromBook.js';
import earnedFromChapter from '../controllers/booksController/earnedFromChapter.js';

const router = express.Router();

// router.get('/', getAllBooks);
// router.post('/', protect, addNewBook);
// router.get('/:id', protect, getBookById);
// router.put('/publish', protect, publishBook);
// router.put('/', protect, editBook);

router.get('/users', protect, admin, sort, adminGetUsers);
router.get('/refills', protect, admin, sort, adminRefillRequests);
router.get('/withdraws', protect, admin, sort, adminWithdrawRequests);
router.get('/paidbooks', protect, admin, sort, adminPaidBooks);
router.get('/unlocks', protect, admin, sort, adminUnlocks);
router.get('/bookearned/:id', protect, admin, earnedFromBook);
router.get('/chapterearned/:id', protect, admin, earnedFromChapter);

export default router;
