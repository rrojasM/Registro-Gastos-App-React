import React, { useState, useEffect, useContext } from "react";
import UseObtenerGastosPorMes from '../hooks/UseObtenerGastosPorMes';

const TotalGatadoContext = React.createContext();
const useTotalMes = () => useContext(TotalGatadoContext)
const TotalGastadoProvider = ({ children }) => {

    const [total, setTotal] = useState();
    const gastos = UseObtenerGastosPorMes();

    useEffect(() => {
        let suma = 0;
        
        gastos.forEach((gasto) => {
            suma += gasto.cantidad;
        });
        setTotal(suma);

    }, [gastos])

    return (
        <TotalGatadoContext.Provider value={{ total: total }}>
            {children}
        </TotalGatadoContext.Provider>
    )
}


export { TotalGastadoProvider, useTotalMes }
