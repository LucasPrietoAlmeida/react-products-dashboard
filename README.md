# Product Manager App (React + TypeScript)

Aplicación frontend desarrollada con **React + TypeScript** para la gestión de productos, con autenticación, rutas protegidas y consumo de una API REST.

Proyecto realizado como práctica del bootcamp de **KeepCoding – Desarrollo Web Full Stack**.

---

## Funcionalidades

### Autenticación
- Login con usuario y contraseña
- Opción **Recordar sesión** (localStorage / sessionStorage)
- Protección de rutas mediante token
- Logout seguro

### Productos
- Listado de productos
- Ver detalle de un producto
- Crear nuevos productos
- Eliminar productos con confirmación
- Filtros por:
  - Nombre
  - Tag
  - Estado (oferta / normal)

### Navegación
- Navbar global con enlaces
- Navbar oculto en `/login`
- Redirecciones automáticas según sesión
- Página 404 personalizada

---

## Tecnologías usadas

- **React**
- **TypeScript**
- **React Router DOM**
- **CSS puro**
- **Fetch API**
- **Vite**

---

## 📁 Estructura del proyecto
```
src/
│
├── components/
│ └── LogoutButton.tsx
│
├── pages/
│ ├── LoginPage.tsx
│ ├── ProductsPage.tsx
│ ├── ProductPage.tsx
│ ├── NewProductPage.tsx
│ ├── Navbar.tsx
│ └── NotFoundPage.tsx
│
├── routes/
| ├── ProtectedLayout.tsx
│ └── ProtectedRoute.tsx
│
├── services/
│ ├── auth.ts
│ └── products.ts
│
├── App.tsx
├── main.tsx
└── index.css
```
---

## Seguridad y control de acceso

- Token almacenado según preferencia del usuario:
  - `localStorage` → recordar sesión
  - `sessionStorage` → sesión temporal
- Rutas protegidas mediante `ProtectedRoute`

---

## Cómo ejecutar el proyecto

### 1- Instalar dependencias
npm install 

### 2- Instalar dependencias
npm run dev

La app se ejecutará en:
http://localhost:5173

Es necesario tener el backend en ejecución en:
http://localhost:8000

---

### Endpoints usados

- POST /auth/login

- GET /api/products

- GET /api/products/:id

- POST /api/products

- DELETE /api/products/:id

Todos los endpoints requieren Bearer Token, excepto login.

### Estados contemplados

- Loading

- Error de autenticación

- Error de carga

- Lista vacía

