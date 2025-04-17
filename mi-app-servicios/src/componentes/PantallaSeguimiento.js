import React from 'react';

const PantallaSeguimiento = ({ onFinalizar }) => {
  return (
    <div>
      <h2>Seguimiento de Solicitud</h2>
      <p>Tu experto ha sido notificado y se encuentra en camino.</p>
      <p>Estado: En progreso 🚚</p>
      <button onClick={onFinalizar}>Finalizar</button>
    </div>
  );
};

export default PantallaSeguimiento;
