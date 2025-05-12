import React, { useState } from 'react';

import Login from './componentes/auth/Login';
import PantallaRegistro from './componentes/auth/PantallaRegistro';
import PantallaPerfilExperto from './componentes/perfiles/PantallaPerfilExperto';

import PantallaInicio from './componentes/inicio/PantallaInicio';
import PantallaFinal from './componentes/inicio/PantallaFinal';

import PantallaCotizar from './componentes/servicios/PantallaCotizar';
import PantallaServicios from './componentes/servicios/PantallaServicios';
import PantallaSolicitud from './componentes/servicios/PantallaSolicitud';
import PantallaSolicitudesGuardadas from './componentes/servicios/PantallaSolicitudesGuardadas';
import PantallaSeguimiento from './componentes/servicios/PantallaSeguimiento';

import PantallaPago from './componentes/pagos/PantallaPago';

import './App.css';

function App() {
  const [pantalla, setPantalla] = useState('login'); // ← ahora inicia en Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [servicio, setServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [expertoSeleccionado, setExpertoSeleccionado] = useState(null);

  const getClase = (nombrePantalla) => {
    return pantalla === nombrePantalla ? 'pantalla activa' : 'pantalla';
  };

  return (
    <div className="App">

      {/* LOGIN */}
      {pantalla === 'login' && (
        <Login
          onRegistro={() => setPantalla('registro')}
          onLoginExitoso={() => setPantalla('inicio')}
        />
      )}

      {/* PANEL DE BIENVENIDA */}
      {pantalla === 'inicio' && (
        <PantallaInicio
          onCotizar={(experto) => {
           setExpertoSeleccionado(experto);
           setPantalla('cotizar');
        }}
          onVerSolicitudes={() => setPantalla('verSolicitudes')}
          onLogout={() => setPantalla('login')}
         />
      )}

      {pantalla === 'cotizar' && expertoSeleccionado && (
        <PantallaCotizar
         experto={expertoSeleccionado}
         onEnviarCotizacion={(datos) => {
         console.log('Cotización enviada:', datos);
          setPantalla('inicio');
        }}
         onVolver={() => setPantalla('inicio')}
        />
      )}


      {/* REGISTRO */}
      {pantalla === 'registro' && (
       <PantallaRegistro
         onRegistro={(tipoUsuario) => {
           if (tipoUsuario === 'cliente') {
            setPantalla('inicio');
         } else if (tipoUsuario === 'experto') {
          setPantalla('perfilExperto');
         }
        }}
        />
      )}

        {/* SELECCION DE PERFIL EXPERTO */}
        {pantalla === 'perfilExperto' && (
         <PantallaPerfilExperto />
         )}

      {/* SELECCIÓN DE SERVICIOS */}

      {pantalla === 'servicios' && (
        <PantallaServicios
          onSeleccionar={(serv) => {
            setServicio(serv);
            setPantalla('solicitud');
          }}
        />
      )}

      {/* DESCRIPCIÓN DE LA SOLICITUD */}
      {pantalla === 'solicitud' && (
        <PantallaSolicitud
          email={email}
          servicio={servicio}
          setDescripcion={setDescripcion}
          onConfirmar={() => setPantalla('pago')}
        />
      )}

      {/* SOLICITUDES GUARDADAS */}
      {pantalla === 'verSolicitudes' && (
        <PantallaSolicitudesGuardadas onVolver={() => setPantalla('inicio')} />
      )}

      {/* PAGO */}
      {pantalla === 'pago' && (
        <PantallaPago onPagar={() => setPantalla('seguimiento')} />
      )}

      {/* SEGUIMIENTO */}
      {pantalla === 'seguimiento' && (
        <PantallaSeguimiento onFinalizar={() => setPantalla('final')} />
      )}

      {/* FINAL */}
      {pantalla === 'final' && (
        <PantallaFinal onLogout={() => setPantalla('login')} />
      )}
    </div>
  );
}

export default App;