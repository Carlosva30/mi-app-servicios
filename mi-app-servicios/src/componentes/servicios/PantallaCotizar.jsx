import React, { useState } from 'react';
import axios from '../../api/axios';

function PantallaCotizar({ experto, onEnviarCotizacion, onVolver }) {
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const cotizacion = {
      expertoId: experto._id || experto.id,
      servicio: experto.servicio,
      descripcion,
      valorPropuesto: parseInt(valor, 10)
    };

    try {
      await axios.post('/cotizaciones', cotizacion); // se envía al backend con token automáticamente
      setMensaje('✅ Cotización enviada correctamente');

      if (onEnviarCotizacion) {
        onEnviarCotizacion(cotizacion); // cambia de pantalla
      }

    } catch (error) {
      console.error('❌ Error al enviar la cotización:', error);
      setMensaje('❌ Error al enviar la cotización');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Cotizar Servicio</h2>
      <p>👷‍♂️ Experto: <strong>{experto.nombre}</strong></p>
      <p>🛠 Servicio: {experto.servicio}</p>

      <form onSubmit={manejarEnvio}>
        <textarea
          placeholder="Describe el servicio que necesitas"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          style={{ width: '80%', height: '100px', marginBottom: '15px', padding: '10px' }}
        />
        <br />

        <input
          type="number"
          placeholder="Valor que puedes pagar"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          style={{ width: '50%', padding: '10px', marginBottom: '15px' }}
        />
        <br />

        <button type="submit" style={{ padding: '10px 20px' }}>Enviar Cotización</button>
        <br /><br />
        <button type="button" onClick={onVolver} style={{ padding: '10px 20px' }}>
          Volver
        </button>

        {mensaje && (
          <p style={{ marginTop: '15px', fontWeight: 'bold', color: mensaje.startsWith('✅') ? 'green' : 'red' }}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}

export default PantallaCotizar;
