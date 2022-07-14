import { useState, useEffect } from "react";
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { useAuth } from '../context/AuthContext';

const UseObtenerGastos = () => {
    const { usuario } = useAuth();
    const [gastos, setGastos] = useState([]);
    const [ultimoGasto, setUltimoGasto] = useState(null);
    const [hayMasContenido, setHayMasContenido] = useState(false)

    const obtenerMasGastos = () => {
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto)
        );

        onSnapshot(consulta, (snapshot) => {
            if (snapshot.docs.length > 0) {
                setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                setGastos(gastos.concat(snapshot.docs.map((gasto) => {
                    return { ...gasto.data(), id: gasto.id }
                })));
            } else {
                setHayMasContenido(false)
            }
        }, error => { console.log("ERROR EN ON SNAPSHOT", error); })

    }

    useEffect(() => {

        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)

        );

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            if (snapshot.docs.length > 0) {
                setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                setHayMasContenido(true);
            } else {
                setHayMasContenido(false);
            }
            setGastos(snapshot.docs.map((gasto) => {
                return { ...gasto.data(), id: gasto.id }
            }))
        });

        return unsuscribe;
    }, [usuario]);

    return [gastos, obtenerMasGastos, hayMasContenido];
}

export default UseObtenerGastos;