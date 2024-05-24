const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const canchasRoutes = require('./routes/canchas');

dotenv.config();

const app = express();
const port = process.env.PORT || 5004;

app.use(morgan('combined'));
app.use(express.json());
// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con la URL correcta de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir cookies y cabeceras de autenticación
}));

// Conexión a MongoDB usando la cadena de conexión del archivo .env

// Conexión a MongoDB usando la cadena de conexión del archivo .env
const mongoURI = process.env.MONGO_DB;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado exitosamente'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/sucursales', canchasRoutes);

app.listen(port, () => {
    console.log('App corriendo en el puerto:', port);
});
