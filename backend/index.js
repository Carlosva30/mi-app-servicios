const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

//URI  mongoDB
const uri = 'mongodb://appServicios:Sarasara2.@ac-ok92fuo-shard-00-00.nhorckw.mongodb.net:27017,ac-ok92fuo-shard-00-01.nhorckw.mongodb.net:27017,ac-ok92fuo-shard-00-02.nhorckw.mongodb.net:27017/?replicaSet=atlas-5lgsai-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

// Conectar a MongoDB
mongoose.connect(uri)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión a MongoDB:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🎉');
});

const rutasSolicitudes = require('./routes/solicitudes');
app.use('/api/solicitudes', rutasSolicitudes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
