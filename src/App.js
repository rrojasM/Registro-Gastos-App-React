import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './elements/Header';
import Boton from "./elements/Boton";
import BotonCerrar from "./elements/BotonCerrar";
import FormularioGasto from "./components/FormularioGasto";
import BarraTotal from "./components/BarraTotal";

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
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista">Lista de Gastos</Boton>
            <BotonCerrar />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
      <FormularioGasto />
      <BarraTotal />
    </>
  );
}

export default App;