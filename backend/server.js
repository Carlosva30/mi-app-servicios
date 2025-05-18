const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware global de CORS configurado correctamente
app.use(cors({
  origin: [
    'http://localhost:3000',                       // Desarrollo local
    'https://mi-app-frontend.vercel.app'       // ✅ frontend real en Vercel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// 🔌 Conexión a MongoDB Atlas
console.log("🧪 URI de conexión MongoDB:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas del backend
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const solicitudRoutes = require('./routes/solicitudes');
app.use('/api/solicitudes', solicitudRoutes);

const cotizacionRoutes = require('./routes/cotizaciones');
app.use('/api/cotizaciones', cotizacionRoutes);

// Ruta base (opcional)
app.get('/', (req, res) => {
  res.send('🚀 API Now Services corriendo en Render correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
