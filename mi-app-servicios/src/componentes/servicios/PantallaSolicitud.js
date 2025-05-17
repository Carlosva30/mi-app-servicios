import React, { useState } from 'react';
import axios from '../../api/axios'; // con token incluido

const PantallaSolicitud = ({ onConfirmar }) => {
  const [texto, setTexto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleConfirmar = async () => {
    try {
      const respuesta = await axios.post('/solicitudes', {
        servicio: 'General',           
        descripcion: texto
      });

      setMensaje('✅ Solicitud enviada correctamente');
      onConfirmar(); // cambiar pantalla

    } catch (error) {
      console.error('❌ Error al enviar solicitud:', error);
      setMensaje('❌ Hubo un error al guardar tu solicitud');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Solicitud de Servicio</h2>
      <textarea
        placeholder="Describe tu problema..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        required
        style={{ width: '100%', height: '100px', padding: '10px' }}
      />
      <br />
      <button onClick={handleConfirmar}>Confirmar</button>
      {mensaje && <p style={{ color: mensaje.startsWith('✅') ? 'green' : 'red' }}>{mensaje}</p>}
    </div>
  );
};

export default PantallaSolicitud;
