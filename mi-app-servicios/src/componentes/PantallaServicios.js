import React, { useState } from 'react';

const PantallaServicios = ({ onSeleccionar }) => {
  const [servicio, setServicio] = useState('');

  const seleccionar = (nombre) => {
    setServicio(nombre);
    onSeleccionar(nombre); // pasa a la siguiente pantalla
  };

  return (
    <div>
      <h2>Elige un servicio</h2>
      <button onClick={() => seleccionar('Plomería')}>Plomería</button>
      <button onClick={() => seleccionar('Despinchada')}>Despinchada</button>
      <button onClick={() => seleccionar('Cerrajería')}>Cerrajería</button>
      {servicio && <p>Servicio seleccionado: {servicio}</p>}
    </div>
  );
};

export default PantallaServicios;
