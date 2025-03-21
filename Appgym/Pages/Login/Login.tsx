import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useContextGym } from '../../Provider/ProviderGym';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const { iniciarSesion } = useContextGym(); 
    const navigation = useNavigation();


    //'http://192.168.0.192:5000/login'
    const manejarLogin = async () => {
        try {
          const respuesta = await fetch('http://192.168.0.192:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              correoElectronico,
              contrasena
            })
          });
    
          const data = await respuesta.json(); 
    
          if (respuesta.ok) {
          
            iniciarSesion(data.usuario);
           
            
            if (data.usuario.id_rol === 1) {
              navigation.navigate('Administrador' as never);
            } else {
              navigation.navigate('Usuarios' as never);
            }

          } else {
           
            alert(data.message || 'Credenciales incorrectas');
          }
        } catch (error) {
          alert('Error al conectar con el servidor');
        }
      };


  return (
    <View style={estilos.container}>
      <TextInput
        placeholder="Correo Electrónico"
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
        style={estilos.input}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
        style={estilos.input}
      />
      <Button title="Iniciar sesión" onPress={manejarLogin} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
  },
});