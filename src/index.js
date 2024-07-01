// src/index.js
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const canchasRoutes = require('./routes/canchasRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const reservasAdminRouter = require('./routes/reservasAdminRouter');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRouter');

dotenv.config();

const app = express();
const port = process.env.PORT || 5004;

app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  'http://localhost:4174',
  'http://localhost:4175',
  'http://localhost:4177',
  'https://caruso-futbol-club-1.onrender.com',
  'https://caruso-prueba-back-1.onrender.com',
   
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin); // Agregar log para depuración
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error('Origen no permitido por CORS:', origin); // Log de error para orígenes no permitidos
      callback(new Error('No permitido por CORS'));
    }
  }, //28-06
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const mongoURI = process.env.MONGO_DB;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado exitosamente'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

app.use('/api/usuarios', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/sucursales', canchasRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/reservas/admin', reservasAdminRouter);
app.use('/api/products', productRouter);

app.post('/webhook', (req, res) => {
  const secret = process.env.WEBHOOK_SECRET;
  const sig = `sha256=${crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex')}`;

  const isValid = req.headers['x-hub-signature-256'] === sig;

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  console.log('Webhook received:', req.body);
  res.status(200).send('Webhook received');
});

app.listen(port, () => {
  console.log('App corriendo en el puerto:', port);
});