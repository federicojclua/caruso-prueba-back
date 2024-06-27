// src/index.js
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const canchasRoutes = require('./routes/canchasRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const reservasAdminRouter = require('./routes/reservasAdminRouter');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRouter');
const connectDB = require('./config/db.js');
const fileUpload = require('express-fileupload');

dotenv.config();

const app = express();
const port = process.env.PORT || 5004;

app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

connectDB();

app.use('/api/usuarios', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/sucursales', canchasRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/reservas/admin', reservasAdminRouter);
app.use('/api/products', productRouter);


app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads/'
}));

app.listen(port, () => {
  console.log('App corriendo en el puerto:', port);
});
