import React from 'react';

function PantallaInicio({ onLogin, onRegistro, onVerSolicitudes }) {
  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h1>Bienvenido a mi-app-servicios 👷‍♂️🔧</h1>
      <p>Encuentra expertos en lo que necesitas. Fácil, rápido y seguro.</p>
      
      <button onClick={onLogin}>Iniciar sesión</button>
      <br /><br />
      <button onClick={onRegistro}>Registrarse</button>
      <br /><br />
      <button onClick={onVerSolicitudes}>Ver solicitudes guardadas</button>
    </div>
  );
}

export default PantallaInicio;