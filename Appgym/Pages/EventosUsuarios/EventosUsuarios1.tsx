import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useContextGym } from '../../Provider/ProviderGym';

export default function EventosUsuarios1() {
    const { eventos, obtenerEventos } = useContextGym(); 

    useEffect(() => {
      obtenerEventos(); 
    }, []);
  
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Eventos</Text>
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id_evento?.toString() || 'default_id'}
          renderItem={({ item }) => (
            <View style={styles.item}>
             
              <Text style={styles.text}>Descripción: {item.descripcion}</Text>
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
      fontWeight: "bold",
      marginVertical: 10,
    },
    item: {
      padding: 10,
      borderWidth: 1,
      marginVertical: 10,
      borderRadius: 5,
    },
    text: {
      fontSize: 16,
    },
  });