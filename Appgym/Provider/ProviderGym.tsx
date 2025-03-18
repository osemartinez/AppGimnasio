import { View, Text } from 'react-native'
import React, { ReactNode, useContext, useState } from 'react'
import { Usuario } from '../Models/Usuario';
import { ContextGym } from '../Context/ContextGym';

interface NodeReact{
    children:ReactNode;
}

export default function ProviderGym({children}: NodeReact) {

    const [usuario, setUsuario] = useState<Usuario | null>(null); 
    const [idRol, setIdRol] = useState<number | null>(null);

    const iniciarSesion = (datosUsuario: Usuario) => {
    setUsuario(datosUsuario); 
    setIdRol(datosUsuario.id_rol);

  };

    const cerrarSesion = () => {
    setUsuario(null); 
    setIdRol(null);
  };



  return (
    <ContextGym.Provider value={{
        usuario,
        idRol,
        iniciarSesion,
        cerrarSesion
    }}>
      {children}

    </ContextGym.Provider>
  )
}

export const useContextGym = () => {
    return useContext(ContextGym)
}