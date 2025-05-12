#  Now Services – App de Solicitud de Servicios

Now Services es una aplicación web desarrollada con **React** en el frontend y **Node.js + Express + MongoDB** en el backend. Permite a clientes registrar solicitudes de servicio (ej. plomería, electricidad, etc.) y a expertos postularse y gestionar esas solicitudes.

---

##  Requisitos mínimos

- Sistema operativo: Windows 10 o superior
- Node.js: v18 o superior
- NPM: v9 o superior
- MongoDB Atlas: cuenta gratuita activa
- Almacenamiento mínimo: 250 MB libres
- Navegador recomendado: Google Chrome o Firefox (última versión)

---

##  Instalación y ejecución local

### Backend

1. Clona el repositorio:  
   `git clone https://github.com/Carlosva30/mi-app-servicios`
2. Entra a la carpeta del backend:  
   `cd mi-app-servicios/backend`
3. Instala dependencias:  
   `npm install`
4. Crea un archivo `.env` con el siguiente contenido:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.nhorckw.mongodb.net/nowservices?retryWrites=true&w=majority
JWT_SECRET=mi_clave_secreta
```

5. Inicia el backend:  
   `npm run dev`

###  Frontend

1. En otra terminal, entra al frontend:  
   `cd mi-app-servicios/frontend`
2. Instala dependencias:  
   `npm install`
3. Ejecuta la app:  
   `npm start`


---
## Configuración de la base de datos (MongoDB Atlas)

Para ejecutar este proyecto, debes tener una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Aquí te explico cómo configurarla paso a paso:

###  Pasos para obtener tu propia URI de conexión:

1. **Regístrate o inicia sesión** en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **Crea un clúster gratuito** (puede tardar unos minutos).
3. **Crea un usuario de base de datos**, por ejemplo:
   - Usuario: `appServicios`
   - Contraseña: `Contraseña1234` (o la que elijas)
4. **Permite acceso desde cualquier IP** agregando `0.0.0.0/0` en Network Access.
5. **Copia el URI de conexión**, algo así:

```
mongodb+srv://appServicios:Contraseña1234@cluster0.nhorckw.mongodb.net/nowservices?retryWrites=true&w=majority
```

6. **Pega ese URI en tu archivo `.env`** así:

```env
PORT=5000
MONGODB_URI=mongodb+srv://TU_USUARIO:TU_CONTRASEÑA@cluster0.nhorckw.mongodb.net/nowservices?retryWrites=true&w=majority
JWT_SECRET=mi_clave_secreta
```

🔐 Este archivo `.env` **no debe subirse a GitHub**, porque contiene información sensible.

---



##  ¿Qué es y cómo crear el archivo `.env`?

El archivo `.env` es un archivo de configuración **necesario para que el backend funcione correctamente**. Allí pondrás tus datos de conexión a MongoDB y una clave secreta para autenticar usuarios.

###  ¿Cómo lo creas?

1. **Abre Visual Studio Code**.
2. Dentro de la carpeta `backend`, haz clic derecho y selecciona **"Nuevo archivo"**.
3. Escribe exactamente este nombre:
   ```
   .env
   ```
   -  El punto al inicio es obligatorio
   -  No pongas `.txt` ni ningún otro final

4. Abre ese archivo vacío y **copia y pega** lo siguiente:

```env
PORT=5000
MONGODB_URI=mongodb+srv://TU_USUARIO:TU_CONTRASEÑA@cluster0.nhorckw.mongodb.net/nowservices?retryWrites=true&w=majority
JWT_SECRET=mi_clave_secreta
```

 Reemplaza `TU_USUARIO` y `TU_CONTRASEÑA` por el usuario y contraseña que creaste en tu cuenta de **MongoDB Atlas**.

5. Guarda el archivo con `Ctrl + S`.

**Este archivo NO debe subirse a GitHub.** Guarda tus datos en privado.

---
## Autenticación

- El sistema usa **JWT** para proteger rutas privadas.
- El token se almacena en `localStorage` y se envía automáticamente usando Axios Interceptors.

---

##  API Endpoints destacados

| Método | Ruta               | Descripción                         |
|--------|--------------------|-------------------------------------|
| POST   | `/api/auth/login`  | Iniciar sesión                      |
| POST   | `/api/auth/registro` | Registro de usuario              |
| GET    | `/api/solicitudes` | Obtener solicitudes guardadas       |
| POST   | `/api/solicitudes` | Registrar una nueva solicitud       |

---

##  Pruebas realizadas

- ✅ Pruebas funcionales de login y registro
- ✅ Pruebas de persistencia en MongoDB (verificación en base de datos)
- ✅ Pruebas de UI responsive en Chrome y dispositivos móviles
- ✅ Pruebas de accesibilidad con **Axe DevTools** y **Wave**
- ✅ Pruebas de rendimiento con **Google Lighthouse** y **PageSpeed**
- ✅ Simulación de seguridad (inyección bloqueada por uso de Mongo y validaciones)

---

##  Licencia

Este proyecto usa la licencia MIT.

---

##  Autor

Carlos Andrés Valencia Flórez – [@Carlosva30](https://github.com/Carlosva30)

##  Instalación y ejecución local paso a paso

###  Recomendación inicial

Abre toda la carpeta del proyecto en **Visual Studio Code** (la que se llama `MI-APP-SERVICIOS`) para que puedas ver tanto el backend como el frontend.

### Estructura del proyecto

```
MI-APP-SERVICIOS/
├── backend/               → Contiene el servidor Node.js y la API
└── mi-app-servicios/     → Contiene el proyecto React (interfaz de usuario)
```

---

###  Ejecutar el Backend (API con Express)

1. Abre **una terminal** en VS Code (puedes presionar `Ctrl + ñ` o hacer clic en el ícono `+` en la parte superior derecha de la terminal).
2. Navega al backend con este comando:

```bash
cd backend
```

3. Asegúrate de tener un archivo `.env`. Si no lo tienes, créalo dando clic derecho sobre la carpeta `backend` → `Nuevo archivo`, y escribe exactamente `.env` como nombre. Dentro, pega lo siguiente:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.nhorckw.mongodb.net/nowservices?retryWrites=true&w=majority
JWT_SECRET=mi_clave_secreta
```

Reemplaza `<usuario>` y `<contraseña>` con tus credenciales reales de MongoDB Atlas.

4. Instala las dependencias:

```bash
npm install
```

5. Inicia el servidor:

```bash
npm run dev
```

Verás un mensaje como:

```
🚀 Servidor corriendo en http://localhost:5000
✅ Conectado a MongoDB Atlas
```

---

###  Ejecutar el Frontend (React)

1. Abre **otra terminal nueva** en VS Code haciendo clic en el ícono `+` en la esquina superior derecha de la terminal actual (o con `Ctrl + ñ` y cambia de terminal).
2. Navega al frontend con este comando:

```bash
cd mi-app-servicios
```

3. Instala las dependencias:

```bash
npm install
```

4. Inicia la aplicación:

```bash
npm start
```

Se abrirá tu navegador automáticamente en `http://localhost:3000`.
