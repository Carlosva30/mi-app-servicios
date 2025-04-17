import React, { useState } from 'react';
import PantallaInicio from './componentes/PantallaInicio';
import PantallaRegistro from './componentes/PantallaRegistro';
import PantallaServicios from './componentes/PantallaServicios';
import PantallaSolicitud from './componentes/PantallaSolicitud';
import PantallaPago from './componentes/PantallaPago';
import PantallaSeguimiento from './componentes/PantallaSeguimiento';
import PantallaFinal from './componentes/PantallaFinal';
import PantallaSolicitudesGuardadas from './componentes/PantallaSolicitudesGuardadas';
import Login from './componentes/Login'; // Ojo: tu carpeta es "componentes"
import './App.css';

function App() {
  const [pantalla, setPantalla] = useState('login'); // 👈 iniciamos en login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [servicio, setServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const getClase = (nombrePantalla) => {
    return pantalla === nombrePantalla ? 'pantalla activa' : 'pantalla';
  };

  return (
    <div className="App">
      {/* Pantalla de LOGIN */}
      <div className={getClase('login')}>
        <Login onLoginExitoso={() => setPantalla('inicio')} />
      </div>

      {/* Pantalla de INICIO */}
      <div className={getClase('inicio')}>
      <PantallaInicio
         onLogin={() => setPantalla('login')}
         onRegistro={() => setPantalla('registro')}
         onVerSolicitudes={() => setPantalla('verSolicitudes')}
        />
      </div>

      {/* Registro de usuario */}
      <div className={getClase('registro')}>
        <PantallaRegistro
          onRegistro={() => setPantalla('servicios')}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </div>

      {/* Selección de servicios */}
      <div className={getClase('servicios')}>
        <PantallaServicios
          onSeleccionar={(serv) => {
            setServicio(serv);
            setPantalla('solicitud');
          }}
        />
      </div>

      {/* Descripción de la solicitud */}
      <div className={getClase('solicitud')}>
        <PantallaSolicitud
          email={email}
          servicio={servicio}
          setDescripcion={setDescripcion}
          onConfirmar={() => setPantalla('pago')}
        />
      </div>

      {/* Vista de solicitudes guardadas */}
      <div className={getClase('verSolicitudes')}>
        <PantallaSolicitudesGuardadas onVolver={() => setPantalla('inicio')} />
      </div>

      {/* Pantalla de pago */}
      <div className={getClase('pago')}>
        <PantallaPago onPagar={() => setPantalla('seguimiento')} />
      </div>

      {/* Seguimiento del estado del servicio */}
      <div className={getClase('seguimiento')}>
        <PantallaSeguimiento onFinalizar={() => setPantalla('final')} />
      </div>

      {/* Pantalla final de agradecimiento */}
      <div className={getClase('final')}>
        <PantallaFinal
          email={email}
          servicio={servicio}
          descripcion={descripcion}
        />
      </div>
    </div>
  );
}

export default App;
