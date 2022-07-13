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
/* import { Helmet } from "react-helmet";
import favicon from './images/logo.png'; */
import Fondo from './elements/Fondo';

WebFont.load({
  google: {
    families: ['Work Sans:300,400,500', 'sans-serif']
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Contenedor>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/listado' element={<ListaGastos />} />
          <Route path='/gastoCategoria' element={<GastoCategoria />} />
          <Route path='/editar:id' element={<EditarGasto />} />
          <Route path='/' element={<App />} />
        </Routes>
      </Contenedor>
    </BrowserRouter>
    <Fondo />
  </>
);