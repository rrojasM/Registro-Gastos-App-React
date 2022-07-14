import React, { useState } from "react";
import { ContenedorFiltros, Formulario, ContenedorBoton, Input, InputGrande } from "../elements/ElementosFormulario";
import Boton from "../elements/Boton";
import { ReactComponent as IconPlus } from './../images/plus.svg';
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";

const FormularioGasto = () => {

    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('home');
    const [fecha, setFecha] = useState(new Date());


    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            setDescripcion(e.target.value);
        } else if (e.target.name === 'cantidad') {
            setCantidad(e.target.value.replace(/[^0-9]/g, ''))
        }
    }

    return (
        <Formulario>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria={categoria}
                    setCategoria={setCategoria}
                />
                <DatePicker 
                    fecha={fecha}
                    setFecha={setFecha}
                />
            </ContenedorFiltros>

            <div>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={handleChange}
                />

                <InputGrande
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    placeholder="$0.00"
                    value={cantidad}
                    onChange={handleChange}
                />

                <ContenedorBoton>
                    <Boton as="button" primario conIcono type="submit">
                        Agregar Gasto <IconPlus />
                    </Boton>
                </ContenedorBoton>
            </div>
        </Formulario>
    );
}

export default FormularioGasto;