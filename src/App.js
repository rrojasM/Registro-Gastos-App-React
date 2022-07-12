import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './elements/Header';
import Boton from "./elements/Boton";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto!</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto!</Titulo>
          <ContenedorBotones>
            <Boton to="GastoCategoria">Categorias</Boton>
            <Boton to="Listado">Lista de Gastos</Boton>
            <Boton to="Login">x</Boton>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
    </>
  );
}

export default App;