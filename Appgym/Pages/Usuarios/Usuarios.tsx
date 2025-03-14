import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useContextGym } from '../../Provider/ProviderGym';
import { useNavigation } from '@react-navigation/native';

export default function Usuarios() {

  const { usuario, cerrarSesion } = useContextGym(); 
  const navigation = useNavigation();

  const manejarLogout = () => {
    cerrarSesion(); 
    navigation.navigate('Login' as never); 
  };


  return (
    <View style={estilos.container}>
      <Text>Bienvenido, {usuario?.nombre}!</Text>
      <Text>Rol: Usuario</Text>
      <Button title="Cerrar sesión" onPress={manejarLogout} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});