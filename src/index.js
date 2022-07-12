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

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Contenedor>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Registro' element={<Registro />} />
          <Route path='/Listado' element={<ListaGastos />} />
          <Route path='/GastoCategoria' element={<GastoCategoria />} />
          <Route path='/Editar:id' element={<EditarGasto />} />
          <Route path='/' element={<App/>} />
        </Routes>
      </Contenedor>
    </BrowserRouter>
  </React.StrictMode>
);