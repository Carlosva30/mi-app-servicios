import React from 'react';

const PantallaFinal = ({ email, servicio, descripcion }) => {
  return (
    <div>
      <h2>Servicio Completado</h2>
      <p>Gracias por usar nuestros servicios 💙</p>
      <hr />
      <p><strong>Usuario:</strong> {email}</p>
      <p><strong>Servicio solicitado:</strong> {servicio}</p>
      <p><strong>Descripción:</strong> {descripcion}</p>
    </div>
  );
};

export default PantallaFinal;
