//server
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Ruta relativa a `db.js`
const authRoutes = require('./routes/authRoutes'); // Ruta relativa a `authRoutes.js`

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
