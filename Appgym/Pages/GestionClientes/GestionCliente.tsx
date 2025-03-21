import {View,  Text,  TextInput,  Button,  FlatList,  StyleSheet, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { useContextGym } from "../../Provider/ProviderGym";
import { Usuario } from "../../Models/Usuario";
import { Picker } from '@react-native-picker/picker';

export default function GestionCliente() {
  const { usuarios, agregarUsuario, actualizarUsuario, cambiarEstadoUsuario, obtenerUsuarios } = useContextGym(); 
  const [nombre, setNombre] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idRol, setIdRol] = useState(2); 
  const [idUsuario, setIdUsuario] = useState<number | null>(null); 

  // Cargar usuario cuando idUsuario es distinto de null
  useEffect(() => {
    if (idUsuario !== null) {
      const usuario = usuarios.find((usuario) => usuario.id_usuario === idUsuario);
      if (usuario) {
        setNombre(usuario.nombre);
        setCorreoElectronico(usuario.correoElectronico);
        setTelefono(usuario.telefono);
        setIdRol(usuario.id_rol); 
      }
    } else {
      setNombre('');
      setCorreoElectronico('');
      setTelefono('');
      setIdRol(2); 
    }
  }, [idUsuario, usuarios]);

  // Función para agregar un nuevo usuario
  const manejarAgregarUsuario = () => {
    const nuevoUsuario: Usuario = { 
      nombre,
      correoElectronico,
      telefono,
      estado: 'activo', 
      id_rol: idRol, 
      contrasena: "", 
      fechaRegistro: new Date().toISOString(), 
    };

    agregarUsuario(nuevoUsuario);
    setNombre('');
    setCorreoElectronico('');
    setTelefono('');
    setIdRol(2); 
  };

  // Función para actualizar un usuario
  const manejarActualizarUsuario = () => {
    if (idUsuario !== null) {  
      const usuarioActualizado: Usuario = {
        id_usuario: idUsuario, 
        nombre,
        correoElectronico,
        telefono,
        estado: 'activo', 
        id_rol: idRol, 
        contrasena: "", 
        fechaRegistro: new Date().toISOString(), 
      };
      actualizarUsuario(idUsuario, usuarioActualizado);
      setIdUsuario(null);
      setNombre('');
      setCorreoElectronico('');
      setTelefono('');
      setIdRol(2); 
    }
  };

  // Funcion para inactivar un usuario
  const manejarInactivarUsuario = (id: number | undefined) => {
    if (id !== undefined) {
      cambiarEstadoUsuario(id, 'inactivo');
      obtenerUsuarios(); 
    }
  };

  // Filtrar usuarios para que no aparezcan los inactivos
  const usuariosActivos = usuarios.filter((usuario) => usuario.estado === 'activo');

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Correo Electrónico" value={correoElectronico} onChangeText={setCorreoElectronico} style={styles.input} />
      <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} style={styles.input} />

      {/* Picker para seleccionar el rol */}
      <Picker
        selectedValue={idRol}
        onValueChange={(itemValue) => setIdRol(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Cliente" value={2} />
        <Picker.Item label="Administrador" value={1} />
      </Picker>

      <Button title={idUsuario ? "Actualizar Usuario" : "Agregar Usuario"} onPress={idUsuario ? manejarActualizarUsuario : manejarAgregarUsuario} />

      <FlatList
        data={usuariosActivos}  
        keyExtractor={(item) => item.id_usuario?.toString() || ''} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <Text>{item.correoElectronico}</Text>
            <Text>{item.telefono}</Text>
            <Text>{item.estado}</Text>

            
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setIdUsuario(item.id_usuario || null)} style={styles.button}>
                <Text>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => manejarInactivarUsuario(item.id_usuario)} style={styles.button}>
                <Text>Inactivar</Text>
              </TouchableOpacity>
            </View>
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
  actions: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  picker: {
    marginVertical: 10,
  },
});