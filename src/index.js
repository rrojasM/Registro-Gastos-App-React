import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elements/Contenedor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import GastoCategoria from './components/GastosCategoria';
import EditarGasto from './components/EditarGasto';
import ListaGastos from './components/ListaGastos';
import Fondo from './elements/Fondo';
import { AuthProvider } from './context/AuthContext';
import RoutesPrivate from './components/RoutesPrivate'


WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AuthProvider>
      <BrowserRouter>
        <Contenedor>
          <Routes>
            {/**Rutas publicas */}
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />

            {/**Routas privadas */}
            <Route path='/categorias' element={
              <RoutesPrivate >
                <GastoCategoria />
              </RoutesPrivate>
            } />

            <Route path='/lista' element={
              <RoutesPrivate >
                <ListaGastos />
              </RoutesPrivate>
            } />

            <Route path='/editar/:id' element={
              <RoutesPrivate >
                <EditarGasto />
              </RoutesPrivate>
            } />

            <Route path='/' element={
              <RoutesPrivate >
                <App />
              </RoutesPrivate>
            } />
          </Routes>
        </Contenedor>
      </BrowserRouter>
    </AuthProvider>
    <Fondo />
  </>
);