import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useContextGym } from '../../Provider/ProviderGym';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Reservas from '../Reservas/Reservas';
import EventosUsuarios1 from '../EventosUsuarios/EventosUsuarios1';

export default function Usuarios() {

  const { usuario, cerrarSesion } = useContextGym(); 
  const navigation = useNavigation();

  const Tab = createBottomTabNavigator();

  const manejarLogout = () => {
    cerrarSesion(); 
    navigation.navigate('Login' as never); 
  };


  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={manejarLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* Tab Navigator para la navegación del Administrador */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false, 
        }}
      >

      <Tab.Screen
          name="Eventos y Promociones"
          component={EventosUsuarios1}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="event" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Reservas"
          component={Reservas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="sports-gymnastics" size={24} color="black" />
            ),
          }}
        />
      
      </Tab.Navigator>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoutButton: {
    marginRight: 10,
  },
  logoutText: {
    color: 'red', // Puedes personalizar el color
    fontWeight: 'bold',
  },
});