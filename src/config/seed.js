// src/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Cancha = require('./models/Cancha');
const FRONTEND_URL = 'https://caruso-futbol-club-1.onrender.com';
dotenv.config();

const canchas = [
  { nombre: 'Cancha 1', sucursal: 'sucursal1' },
  { nombre: 'Cancha 2', sucursal: 'sucursal1' },
  { nombre: 'Cancha 3', sucursal: 'sucursal2' },
  { nombre: 'Cancha 4', sucursal: 'sucursal2' },
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Cancha.deleteMany({});
  await Cancha.insertMany(canchas);

  console.log('Base de datos poblada');
  mongoose.connection.close();
};

seedDB();
