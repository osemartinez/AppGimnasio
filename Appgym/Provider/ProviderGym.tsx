import { View, Text } from 'react-native'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Usuario } from '../Models/Usuario';
import { ContextGym } from '../Context/ContextGym';
import { Clase } from '../Models/Clase';
import { Reserva } from '../Models/Reserva';
import { Evento } from '../Models/Evento';

interface NodeReact{
    children:ReactNode;
}

export default function ProviderGym({children}: NodeReact) {

    const [usuario, setUsuario] = useState<Usuario | null>(null); 
    const [idRol, setIdRol] = useState<number | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [clases, setClases] = useState<Clase[]>([]);

    const [reservas, setReservas] = useState<Reserva[]>([]);

    const [eventos, setEventos] = useState<Evento[]>([]);

    const API_URL ='http://192.168.0.192:5000'

    //(`http://localhost:5000/usuarios/${id_usuario}`



  

    const iniciarSesion = (datosUsuario: Usuario) => {
      setUsuario(datosUsuario); 
      setIdRol(datosUsuario.id_rol);

    };

    const cerrarSesion = () => {
      setUsuario(null); 
      setIdRol(null);
    };


  // Función para obtener los usuarios
  const obtenerUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`); 
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  // Función para agregar un usuario
  const agregarUsuario = async (usuario: Usuario) => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      const newUser = await response.json();
      setUsuarios([...usuarios, newUser]); 
    } catch (error) {
      console.error('Error al agregar usuario', error);
    }
  };

  // Función para actualizar un usuario
  const actualizarUsuario = async (id_usuario: number, usuario: Usuario) => {
    try {
      const response = await fetch(`http://localhost:5000/usuarios/${id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      const updatedUser = await response.json();

      if (response.ok) {
       
        obtenerUsuarios(); 
      }

    
      setUsuarios(usuarios.map((u) => (u.id_usuario === id_usuario ? updatedUser : u)));
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };

  // Función para cambiar el estado de un usuario (activo/inactivo)
  const cambiarEstadoUsuario = async (id_usuario: number, estado: string) => {
    try {
      const usuario = usuarios.find(u => u.id_usuario === id_usuario);
      if (usuario) {
        // Actualizamos solo el campo estado
        const updatedUser = { ...usuario, estado };
        await actualizarUsuario(id_usuario, updatedUser);
      }
    } catch (error) {
      console.error('Error al cambiar el estado del usuario', error);
    }
  };

  /* Función para inactivar un usuario (en lugar de eliminar)
  const eliminarUsuario = (id_usuario: number) => {
    cambiarEstadoUsuario(id_usuario, 'inactivo');
  };*/

 

//clases
// Obtener clases desde el backend
const obtenerClases = async () => {
  try {
    const response = await fetch("http://localhost:5000/clases");
    const data = await response.json();
    setClases(data);
  } catch (error) {
    console.error("Error al obtener las clases", error);
  }
};

// Agregar clase
const agregarClase = async (clase: Clase) => {
  try {
    const response = await fetch("http://localhost:5000/clases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clase),
    });
    const newClase = await response.json();
    setClases([...clases, newClase]);
  } catch (error) {
    console.error("Error al agregar clase", error);
  }
};

// Actualizar clase
const actualizarClase = async (id_clase: number, clase: Clase) => {
  try {
    const response = await fetch(`http://localhost:5000/clases/${id_clase}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clase),
    });
    const updatedClase = await response.json();

    if (response.ok) {
       
      obtenerClases(); 
    }
   // setClases(clases.map((c) => c.id_clase === id_clase ? { ...c, ...updatedClase } : c));
    setClases(clases.map((c) => (c.id_clase === id_clase ? updatedClase : c)));

    
  } catch (error) {
    console.error("Error al actualizar clase", error);
  }
};

// Cambiar estado clase (activo/inactivo)
const cambiarEstadoClase = async (id_clase: number, estado: 'activo' | 'inactivo') => {
  try {
    const clase = clases.find((c) => c.id_clase === id_clase);
    if (clase) {
      const updatedClase = { ...clase, estado };
      await actualizarClase(id_clase, updatedClase);
    }
  } catch (error) {
    console.error("Error al cambiar el estado de la clase", error);
  }
};

//reservas

const obtenerReservas = async () => {
  try {
    const response = await fetch('http://localhost:5000/reservas');
    const data = await response.json();
    setReservas(data);
  } catch (error) {
    console.error("Error al obtener las reservas", error);
  }
};

// Función para agregar una reserva
const agregarReserva = async (reserva: Reserva) => {
  try {
    const response = await fetch("http://localhost:5000/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserva),
    });

    const nuevaReserva = await response.json();

    // Actualizamos el estado de reservas
    setReservas((prevReservas) => [...prevReservas, nuevaReserva]);
  } catch (error) {
    console.error("Error al agregar la reserva:", error);
  }
};

// Función para actualizar una reserva
const cancelarReserva = async (id_reserva: number) => {
  try {
    const response = await fetch(`http://localhost:5000/reservas/${id_reserva}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Actualiza el estado de las reservas para reflejar la eliminación
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id_reserva !== id_reserva));
      console.log('Reserva eliminada');
    } else {
      console.error('No se pudo eliminar la reserva');
    }
  } catch (error) {
    console.error('Error al cancelar la reserva', error);
  }
};

//eventos informativos

const obtenerEventos = async () => {
  try {
    const response = await fetch('http://localhost:5000/eventos');
    const data = await response.json();
    setEventos(data);
  } catch (error) {
    console.error('Error al obtener eventos', error);
  }
};

const agregarEvento = async (evento: Evento) => {
  try {
    const response = await fetch('http://localhost:5000/eventos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evento),
    });

    const newEvento = await response.json();
    setEventos((prevEventos) => [...prevEventos, newEvento]);
  } catch (error) {
    console.error('Error al agregar evento', error);
  }
};
/*
const actualizarEvento = async (id_evento: number, evento: Evento) => {
  try {
    const response = await fetch(`http://localhost:5000/eventos/${id_evento}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
    const updatedEvento = await response.json();
    setEventos(eventos.map((e) => (e.id_evento === id_evento ? updatedEvento : e)));
  } catch (error) {
    console.error('Error al actualizar evento:', error);
  }
};*/

// Eliminar un evento
const eliminarEvento = async (id_evento: number) => {
  try {
    const response = await fetch(`http://localhost:5000/eventos/${id_evento}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setEventos(eventos.filter((evento) => evento.id_evento !== id_evento));
    } else {
      console.error('No se pudo eliminar el evento');
    }
  } catch (error) {
    console.error('Error al eliminar evento:', error);
  }
};



useEffect(() => {
  if (idRol === 1) { 
    obtenerUsuarios();
    obtenerClases();
  }
  if (idRol === 2) {
    obtenerReservas(); 
    obtenerClases();
   //obtenerEventos();
  }
}, [idRol]);



  return (
    <ContextGym.Provider value={{
        usuario,
        idRol,
        usuarios,
        iniciarSesion,
        cerrarSesion,
        agregarUsuario,
        actualizarUsuario,
        obtenerUsuarios,
        cambiarEstadoUsuario,
        clases,
        obtenerClases,
        agregarClase,
        actualizarClase,
        cambiarEstadoClase,
        reservas,
        obtenerReservas,
        agregarReserva,
        cancelarReserva,
        eventos, obtenerEventos, agregarEvento,
         eliminarEvento



    }}>
      {children}

    </ContextGym.Provider>
  )
}

export const useContextGym = () => {
    return useContext(ContextGym)
}