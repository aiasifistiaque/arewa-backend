import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import colors from 'colors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import authRoute from './routes/authRoute.js';
import bookRoute from './routes/bookRoute.js';
import chapterRoute from './routes/chapterRoute.js';
import followRoute from './routes/followRoute.js';
import libraryRoute from './routes/libraryRoute.js';
import commentsRoute from './routes/commentsRoute.js';
import refillRoute from './routes/refillRoute.js';
import reportRoute from './routes/reportRoute.js';
import uploadRoute from './routes/awsUpload.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//configuring the AWS environment
// AWS.config.update({
// 	region: process.env.AWS_REGION,
// 	accessKeyId: process.env.AWS_ACCESS_KEY,
// 	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// 	signatureVersion: 'v4',
// });

// const s3 = new AWS.S3();
// const filePath = './data/book.jpg';

//configuring parameters
// const fileStream = fs.createReadStream(filePath);
// const fileName = `images/${Date.now()}_${path.basename(filePath)}`;

// var params = {
// 	Bucket: process.env.S3_BUCKET_NAME,
// 	Body: fileStream,
// 	Key: fileName,
// };

// s3.upload(params, function (err, data) {
// 	//handle error
// 	if (err) {
// 		console.log('Error', err);
// 	}

// 	//success
// 	if (data) {
// 		console.log(data);
// 		console.log('Uploaded in:', data.Location);
// 	}
// });

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'AREWA BOOKS API',
			version: '0.0.1',
		},
	},
	apis: ['app.js', './routes/*.js', './models/*.js', './swagger/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const corsOptions = {
	origin: '*',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

//routes
app.use('/api/auth', authRoute);
app.use('/api/books', bookRoute);
app.use('/api/chapters', chapterRoute);
app.use('/api/follow', followRoute);
app.use('/api/library', libraryRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/refill', refillRoute);
app.use('/api/report', reportRoute);
// app.use('/api/search', searchRoute);
// app.use('/api/explore', exploreRoute);
// app.use('/api/dashboard', dashRoute);
app.use('/api/upload', uploadRoute);
// app.use('/api/review', reviewRoute);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//app.use('/api/payment', gatewayRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));
