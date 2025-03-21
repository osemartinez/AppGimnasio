
import { createContext } from "react";
import {Usuario} from "../Models/Usuario"
import { Clase } from "../Models/Clase";
import { Reserva } from "../Models/Reserva";
import { Evento } from "../Models/Evento";

export const ContextGym = createContext({


    //Login
    usuario: null as Usuario | null,
    idRol: null as number | null,
    iniciarSesion: (datosUsuario: Usuario) => {}, 
    cerrarSesion: () => {}, 

    //curd gestion de clientes
    usuarios: [] as Usuario[], 

    obtenerUsuarios: () => {},
    agregarUsuario: (usuario: Usuario) => {},
    //eliminarUsuario: (id_usuario: number) => {}, 
    actualizarUsuario: (id_usuario: number, usuario: Usuario) => {}, 
    cambiarEstadoUsuario: (id_usuario: number, estado: string) => {}, 

    clases: [] as Clase[], 
    obtenerClases: () => {},
    agregarClase: (clase: Clase) => {},
    actualizarClase: (id_clase: number, clase: Clase) => {},
    cambiarEstadoClase: (id_clase: number, estado: 'activo' | 'inactivo') => {},

    reservas: [] as Reserva[],
    obtenerReservas: () => {},  
    agregarReserva: (reserva: Reserva) => {}, 
    //actualizarReserva: (id_reserva: number, reserva: Reserva) => {},  
    cancelarReserva: (id_reserva: number) => {},

    //eventos informativos
    eventos: [] as Evento[],
    obtenerEventos: () => {},
    agregarEvento: (evento: Evento) => {},
    //actualizarEvento: (id_evento: number, evento: Evento) => {},
    eliminarEvento: (id_evento: number) => {},


});






