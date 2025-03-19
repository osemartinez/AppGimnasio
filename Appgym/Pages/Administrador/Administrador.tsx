import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useContextGym } from "../../Provider/ProviderGym";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GestionCliente from "../GestionClientes/GestionCliente";
import GestionClases from "../GestionClases/GestionClases";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default function Administrador() {
  const { usuario, cerrarSesion } = useContextGym();
  const navigation = useNavigation();

  //const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  const manejarLogout = () => {
    cerrarSesion();
    navigation.navigate("Login" as never);
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
          name="Gestion de clientes"
          component={GestionCliente}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="manage-accounts" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Gestion de clases"
          component={GestionClases}
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


/*
 <Drawer.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={manejarLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        ),
      }}
    >

      <Drawer.Screen
        name="Gestion de clientes"
        component={GestionCliente}
      />
      <Drawer.Screen
        name="Gestion de clases"
        component={GestionClases}
      />
    </Drawer.Navigator>
*/