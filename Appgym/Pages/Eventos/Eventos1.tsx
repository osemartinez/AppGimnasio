import { View, Text, Alert, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useContextGym } from '../../Provider/ProviderGym';

export default function Eventos1() {
    const { eventos, agregarEvento, eliminarEvento, obtenerEventos } = useContextGym();
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    obtenerEventos(); 
  }, []);

  const manejarAgregarEvento = () => {
    if (!descripcion) {
      Alert.alert('Error', 'Por favor ingresa una descripción');
      return;
    }
    agregarEvento({ descripcion });
    setDescripcion(''); // Limpiar el campo de entrada
  };

  const manejarEliminarEvento = (id: number) => {
    eliminarEvento(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Evento</Text>
      <TextInput
        placeholder="Descripción del evento"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />
      <Button title="Agregar Evento" onPress={manejarAgregarEvento} />

      <Text style={styles.title}>Lista de Eventos</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id_evento?.toString() || ''}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.descripcion}</Text>
            <TouchableOpacity 
                onPress={() => item.id_evento && manejarEliminarEvento(item.id_evento)} // Asegurarse de que id_evento no sea undefined
                 style={styles.button}
                    >
              <Text>Eliminar</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
});