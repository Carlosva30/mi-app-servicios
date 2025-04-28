const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crear app de Express
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para leer JSON del cuerpo de las peticiones

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://appServicios:Sarasara2.@cluster0.nhorckw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const solicitudRoutes = require('./routes/solicitudes');
app.use('/api/solicitudes', solicitudRoutes);

// Servidor en marcha
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
