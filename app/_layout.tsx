import { Ionicons } from "@expo/vector-icons";
import {router, Stack} from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const logo = require("../assets/images/spotclaim-icon.png");
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" options={{}} />
        <Stack.Screen name="Details"  options={{
            headerTitle: "Details",
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color="white"
                  style={styles.backIcon}
                />
              </TouchableOpacity>
            ),
          }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2877ff",  
    paddingHorizontal: 6,  
    paddingVertical: 6,  
    borderRadius: 50, 
    marginLeft: 10,
  },
  backIcon: {
    marginRight: 0,
  },
});
