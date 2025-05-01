import React from 'react';

function PantallaPerfilExperto() {
  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h2>Perfil del Experto</h2>
      <p>Aquí el experto verá:</p>
      <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '20px' }}>
        <li>👷‍♂️ Su foto y nombre</li>
        <li>⚡ Categoría de servicio</li>
        <li>⭐ Su calificación</li>
        <li>📑 Cotizaciones recibidas</li>
        <li>🟢 Estado (Disponible / Ocupado)</li>
      </ul>
    </div>
  );
}

export default PantallaPerfilExperto;
