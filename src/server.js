/*const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Ruta relativa a `db.js`
const authRoutes = require('./routes/authRoutes'); // Ruta relativa a `authRoutes.js'

const app = express();

connectDB();

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  'http://localhost:4174',
  'http://localhost:4175',
  'http://localhost:4177'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (por ejemplo, aplicaciones de escritorio)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // Para navegadores antiguos
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
