import { Text, View, StyleSheet, Image } from "react-native";

export default function AboutScreen() {
  const logo = require("../../assets/images/spotclaim-splash-icon.png");
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>SpotClaim</Text>
      <Text style={styles.description}>
        Instantly report accidents to your insurance company with a photo and
        automatic location tracking.
      </Text>
      <Text style={styles.description}>
        Users can find nearby service centers with ease. Advanced mapping and
        file management for seamless claim reporting.
      </Text>
      <Text style={styles.subtitle}>Student Name - Sandusha Marasinghe</Text>
      <Text style={styles.subtitle}>Student ID - 20049887</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
    color: "#34495e",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#7f8c8d",
    textAlign: "center",
  },

  logo: { width: 150, height: 150, marginLeft: 10 },
});
