import { useState, useEffect } from "react";
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { useAuth } from '../context/AuthContext';

const UseObtenerGastos = () => {
    const { usuario } = useAuth();
    const [gastos, setGastos] = useState([]);

    useEffect(() => {

        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)

        );
        const unsuscribe = onSnapshot(consulta, (snapshot) => {

            setGastos(snapshot.docs.map((gasto) => {
                return { ...gasto.data(), id: gasto.id }
            }))
        });

        return unsuscribe;
    }, [usuario]);

    return [gastos];
}

export default UseObtenerGastos;