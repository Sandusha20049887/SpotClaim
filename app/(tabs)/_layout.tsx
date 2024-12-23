import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";

const logo = require("../../assets/images/spotclaim-icon.png");

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20, 
            fontWeight: "bold", 
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
          headerLeft: () => <Image source={logo} style={styles.logo} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Locations",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20, 
            fontWeight: "bold", 
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "navigate-sharp" : "navigate-outline"}
              color={color}
              size={24}
            />
          ),
          headerLeft: () => <Image source={logo} style={styles.logo} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20, 
            fontWeight: "bold", 
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "ribbon-sharp" : "ribbon-outline"}
              color={color}
              size={24}
            />
          ),
          headerLeft: () => <Image source={logo} style={styles.logo} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: { width: 70, height: 40, marginLeft: 10 },
});
