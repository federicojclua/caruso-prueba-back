const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');

dotenv.config();

const app = express();

app.use(morgan('combined'));

app.use(express.json());

const port = process.env.PORT;

//routes
app.use('/', userRouter)

app.use('/api/auth', authRouter)


connectDB();

app.listen(port, ()=>{
    console.log('app corriendo en el puerto: ', port);
})


