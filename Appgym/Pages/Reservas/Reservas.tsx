import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useContextGym } from '../../Provider/ProviderGym';
import { Reserva } from '../../Models/Reserva';
import { Clase } from '../../Models/Clase';

export default function Reservas() {

  const { clases, reservas, agregarReserva, obtenerClases, obtenerReservas, usuario, cancelarReserva } = useContextGym();
  const [reservasUsuario, setReservasUsuario] = useState<Reserva[]>([]);

  const idUsuario = usuario ? usuario.id_usuario : null;

  useEffect(() => {
    if (idUsuario) {
      obtenerReservas(); 
    }
    obtenerClases();
  }, [idUsuario]);

  const manejarReserva = async (idClase: number) => {
    if (!idUsuario) {
      Alert.alert('Error', 'Por favor, inicia sesión para hacer una reserva.');
      return;
    }

    // Verificar si el usuario ya tiene una reserva para esta clase
    const reservaExistente = reservasUsuario.find((reserva) => reserva.id_clase === idClase);
    if (reservaExistente) {
      Alert.alert('Ya reservada', 'Ya has reservado esta clase.');
      return;
    }

    const claseSeleccionada = clases.find((clase) => clase.id_clase === idClase);
    if (!claseSeleccionada) {
      Alert.alert('Error', 'La clase seleccionada no existe');
      return;
    }

    const reservasClase = reservas.filter(
      (reserva) => reserva.id_clase === idClase && reserva.estado === 'reservado'
    );

    if (reservasClase.length >= claseSeleccionada.cuposMaximos) {
      Alert.alert('Error', 'No hay cupos disponibles para esta clase');
      return;
    }

    const nuevaReserva: Reserva = {
      id_clase: idClase,
      id_usuario: idUsuario,
      estado: 'reservado',
      fechaReserva: new Date().toISOString(),
    };

    await agregarReserva(nuevaReserva);
    Alert.alert('Éxito', 'Reserva realizada con éxito');
  };

  const manejarCancelarReserva = async (idReserva: number) => {
    console.log('Cancelando reserva con ID:', idReserva); 
    try {
      await cancelarReserva(idReserva);
      Alert.alert('Cancelado', 'Reserva cancelada con éxito');
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      Alert.alert('Error', 'Hubo un problema al cancelar la reserva');
    }
  };

  const clasesActivas = clases.filter((clase) => clase.estado === 'activo');
  const reservasActivas = reservas.filter((reserva) => reserva.id_usuario === idUsuario && reserva.estado === 'reservado');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clases Disponibles</Text>
      <FlatList
        data={clasesActivas}
        keyExtractor={(item) => item.id_clase?.toString() || ''}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.nombre}</Text>
            <Text style={styles.text}>Instructor: {item.instructorNombre}</Text>
            <Text style={styles.text}>Horario: {item.horaInicio} - {item.horaFin}</Text>
            <Button title="Reservar" onPress={() => manejarReserva(item.id_clase)} />
          </View>
        )}
      />

<Text style={styles.title}>Mis Reservas</Text>
    <FlatList
      data={reservasActivas}
      keyExtractor={(item) => item.id_reserva?.toString() || ''}
      renderItem={({ item }) => {
        // Encuentra la clase correspondiente a la reserva
        const claseReservada = clases.find((clase) => clase.id_clase === item.id_clase);
        
        return (
          <View style={styles.item}>
            {/* Muestra el nombre de la clase y el horario de la reserva */}
            <Text style={styles.text}>{claseReservada?.nombre}</Text>
            <Text style={styles.text}>Instructor: {claseReservada?.instructorNombre}</Text>
            <Text style={styles.text}>Horario: {claseReservada?.horaInicio} - {claseReservada?.horaFin}</Text>
            
            <Button title="Cancelar Reserva" onPress={() => manejarCancelarReserva(item.id_reserva || 0)} />
          </View>
        );
      }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
  },
});