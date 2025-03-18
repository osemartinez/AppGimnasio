import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProviderGym from "./Provider/ProviderGym";
import NavegacionTab from "./Components/NavegacionTab";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <ProviderGym>
    <NavigationContainer>

    <NavegacionTab></NavegacionTab>

    </NavigationContainer>
        
      
    </ProviderGym>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
