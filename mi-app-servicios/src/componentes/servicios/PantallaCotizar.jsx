import React, { useState } from 'react';

function PantallaCotizar({ experto, onEnviarCotizacion, onVolver }) {
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();

    const cotizacion = {
      expertoId: experto._id || experto.id, // por si viene desde Mongo o simulado
      descripcion,
      valorPropuesto: parseInt(valor, 10)
    };

    // Simulación por ahora
    console.log('Cotización lista para enviar al backend:', cotizacion);

    if (onEnviarCotizacion) {
      onEnviarCotizacion(cotizacion);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Cotizar Servicio</h2>
      <p>👷‍♂️ Experto: <strong>{experto.nombre}</strong></p>

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
      </form>
    </div>
  );
}

export default PantallaCotizar;
