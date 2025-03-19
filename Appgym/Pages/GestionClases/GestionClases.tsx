import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useContextGym } from '../../Provider/ProviderGym';
import { Clase } from '../../Models/Clase';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function GestionClases() {
  const { clases, agregarClase, actualizarClase, cambiarEstadoClase, obtenerClases } = useContextGym();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [cuposMaximos, setCuposMaximos] = useState(0);
  const [instructorNombre, setInstructorNombre] = useState('');
  const [idClase, setIdClase] = useState<number | null>(null);

  // Cargar clase cuando idClase es distinto de null
  useEffect(() => {
    if (idClase !== null) {
      const clase = clases.find((clase) => clase.id_clase === idClase);
      if (clase) {
        setNombre(clase.nombre);
        setDescripcion(clase.descripcion);
        setHoraInicio(clase.horaInicio);
        setHoraFin(clase.horaFin);
        setCuposMaximos(clase.cuposMaximos);
        setInstructorNombre(clase.instructorNombre);
      }
    } else {
      setNombre('');
      setDescripcion('');
      setHoraInicio('');
      setHoraFin('');
      setCuposMaximos(0);
      setInstructorNombre('');
    }
  }, [idClase, clases]);

  // Función para agregar una nueva clase
  const manejarAgregarClase = () => {
    const nuevaClase: Clase = {
      nombre,
      descripcion,
      horaInicio,
      horaFin,
      cuposMaximos,
      estado: 'activo', 
      instructorNombre,
    };

    agregarClase(nuevaClase);
    resetForm();
  };

  // Función para actualizar una clase
  const manejarActualizarClase = () => {
    if (idClase !== null) {
      const claseActualizada: Clase = {
        id_clase: idClase, 
        nombre,
        descripcion,
        horaInicio,
        horaFin,
        cuposMaximos,
        estado: 'activo', 
        instructorNombre,
      };
      actualizarClase(idClase, claseActualizada);
      resetForm();
    }
  };

  // Función para inactivar una clase
  const manejarInactivarClase = (id: number | undefined) => {
    if (id !== undefined) {
      cambiarEstadoClase(id, 'inactivo');
      obtenerClases(); 
    }
  };

  // Filtrar clases para que no aparezcan las inactivas
  const clasesActivas = clases.filter((clase) => clase.estado === 'activo');


  // Función para resetear el formulario después de agregar o actualizar
  const resetForm = () => {
    setIdClase(null);
    setNombre('');
    setDescripcion('');
    setHoraInicio('');
    setHoraFin('');
    setCuposMaximos(0);
    setInstructorNombre('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.column}>
          <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
          <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={styles.input} />
          <TextInput placeholder="Hora de inicio (HH:mm)" value={horaInicio} onChangeText={setHoraInicio} style={styles.input} />
        </View>
        <View style={styles.column}>
          <TextInput placeholder="Hora de fin (HH:mm)" value={horaFin} onChangeText={setHoraFin} style={styles.input} />
          <TextInput placeholder="Cupos máximos" value={String(cuposMaximos)} onChangeText={text => setCuposMaximos(Number(text))} style={styles.input} />
          <TextInput placeholder="Instructor" value={instructorNombre} onChangeText={setInstructorNombre} style={styles.input} />
        </View>
      </View>

      <Button title={idClase ? "Actualizar Clase" : "Agregar Clase"} onPress={idClase ? manejarActualizarClase : manejarAgregarClase} />

      <FlatList
        data={clasesActivas}  // Uso clases filtradas, solo activas
        keyExtractor={(item) => item.id_clase?.toString() || ''} // esto me esta generando problemas
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <Text>{item.descripcion}</Text>
            <Text>{item.horaInicio}</Text>
            <Text>{item.horaFin}</Text>
            <Text>{item.cuposMaximos}</Text>
            <Text>{item.instructorNombre}</Text>
            <TouchableOpacity onPress={() => setIdClase(item.id_clase || null)} style={styles.button}>
              <Text>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => manejarInactivarClase(item.id_clase)} style={styles.button}>
              <Text>Inactivar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    width: '48%', 
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    padding: 10,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
});