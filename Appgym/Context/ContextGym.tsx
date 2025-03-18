
import { createContext } from "react";
import {Usuario} from "../Models/Usuario"

export const ContextGym = createContext({


    //Login
    usuario: null as Usuario | null,
    idRol: null as number | null,
    iniciarSesion: (datosUsuario: Usuario) => {}, 
    cerrarSesion: () => {} 

    //otros 




})