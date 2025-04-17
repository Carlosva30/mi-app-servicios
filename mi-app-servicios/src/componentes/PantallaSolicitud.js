import React, { useState } from 'react';

const PantallaSolicitud = ({ onConfirmar, setDescripcion }) => {
  const [texto, setTexto] = useState('');

  const handleConfirmar = () => {
    setDescripcion(texto); // esto actualiza el estado en App.js
    console.log("Descripción del problema:", texto);
    onConfirmar(); // pasa a la siguiente pantalla
  };

  return (
    <div>
      <h2>Solicitud de Servicio</h2>
      <textarea
        placeholder="Describe tu problema..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        required
      ></textarea>
      <button onClick={handleConfirmar}>Confirmar</button>
    </div>
  );
};

export default PantallaSolicitud;
