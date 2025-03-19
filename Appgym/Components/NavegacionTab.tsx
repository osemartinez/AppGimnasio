import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Pages/Login/Login";
import Administrador from "../Pages/Administrador/Administrador";
import Usuarios from "../Pages/Usuarios/Usuarios";
import { useContextGym } from "../Provider/ProviderGym";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function NavegacionTab() {
  const tab = createBottomTabNavigator();

  const { idRol } = useContextGym();

  return (
    
    <tab.Navigator initialRouteName="Login">
      {idRol === null && <tab.Screen name="Login" component={Login} options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="login" size={24} color="black" />
          ),
        }} />}

      {idRol === 1 && (
        <tab.Screen name="Administrador" component={Administrador} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="manage-accounts" size={24} color="black" />
          ),
        }} />
      )}

      {idRol === 2 && (
        <tab.Screen name="Usuarios" component={Usuarios} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="users" size={24} color="black" />
          ),
        }} />
      )}
      
    </tab.Navigator>
  );
}

// <tab.Screen name='Administrador' component={Administrador}></tab.Screen>
//<tab.Screen name='Usuarios' component={Usuarios}></tab.Screen>
