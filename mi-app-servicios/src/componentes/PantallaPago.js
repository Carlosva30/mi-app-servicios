import React from 'react';

const PantallaPago = ({ onPagar }) => {
  const handlePagar = () => {
    // lugar para logica de pagos
    console.log("Pago realizado (simulado)");
    onPagar(); // pasa a la siguiente pantalla
  };

  return (
    <div>
      <h2>Resumen de Pago</h2>
      <p>Valor estimado: $50.000</p>
      <button onClick={handlePagar}>Pagar</button>
    </div>
  );
};

export default PantallaPago;
