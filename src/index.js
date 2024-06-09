const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const canchasRoutes = require('./routes/canchas');
const productRouter = require('./routes/productRouter');
const reservaRoutes = require('./routes/reservaRoutes');
const bodyParser = require('body-parser');

//conectar reserva de canchas back con front
const http = require('http');

dotenv.config();

const app = express();
const port = process.env.PORT || 5004;

app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.json());

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con la URL correcta de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir cookies y cabeceras de autenticación
}));

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	})
);

// Conexión a MongoDB usando la cadena de conexión del archivo .env
const mongoURI = process.env.MONGO_DB;

mongoose.connect(mongoURI, {
    ssl: true,               // Habilitar SSL
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado exitosamente'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/usuarios', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/sucursales', canchasRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/productos', productRouter);

app.listen(port, () => {
    console.log('App corriendo en el puerto:', port);
});
