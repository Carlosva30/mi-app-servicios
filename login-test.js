import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,           // Usuarios virtuales simultáneos
  duration: '10s',   // Duración del test
};

export default function () {
  let res = http.post('https://mi-app-backend.onrender.com/api/auth/login', JSON.stringify({
    correo: "usuario@correo.com",
    contraseña: "clave_incorrecta"
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status es 401': (r) => r.status === 401,  // Esperamos error por credenciales inválidas
  });

  sleep(1);
}
