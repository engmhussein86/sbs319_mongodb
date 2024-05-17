import express from 'express';
import dotenv from 'dotenv'; 
import usersRouter from './routes/users.js'
import postsRouter from './routes/posts.js'
import commentsRouter from './routes/comments.js'

//init dotenv pkg
dotenv.config();
//app port
const PORT = process.env.PORT || 4000;
//express app
const app = express();

//============================MIDDLEWARE================================

app.use(express.json());
//custom logger middleware
app.use((req,res,next)=>{
    console.log('request from url: '+ req.url);
    next();
})

console.log(process.env.PORT);
//==================================== Router ==============================
app.get('/', (req,res)=>{
    res.send('welcome to api');
})


app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

//global error handler middleware
app.use((err,req,res,next)=>{
    res.status(500).send('server error!')
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})