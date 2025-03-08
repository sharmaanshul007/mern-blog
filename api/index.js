// import express from 'express';
// import mongoose from 'mongoose';
// import User from './routes/user.route.js'
// import authRoute from './routes/auth.route.js'
// import postRoute from './routes/post.route.js'
// import commentRoute from './routes/comment.route.js'
// import {connect} from './config/database.js'
// import cookieParser from 'cookie-parser';
// import path from "path";
// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// connect();

// const __dirname = path.resolve();

// app.listen(3000,()=>{
//     console.log("Server is running at port 3000!");
// });

// app.use('/api/user',User);
// app.use('/api/auth',authRoute);
// app.use('/api/post',postRoute);
// app.use('/api/comment',commentRoute)

// app.use(express.static(path.join(__dirname,'/client/dist')));

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'client','dist','index.html'))
// })


// app.use((err,req,res,next)=>{
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error";
//     return res.status(statusCode).json({
//         message :message,
//         success:false
//     })
// });






import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.mongo)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});