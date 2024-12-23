import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import useAccidentStore from "./store/accidentStore";
import AccidentStoreState from "./store/accidentStoreState";
import { useNavigation } from "expo-router";
import * as Location from 'expo-location';

interface AccidentItemProps {
  id: string;
  make: string;
  model: string;
  year: string;
  vehicleNumber: string;
  imageUri: any;
  location: any;
}

const Details: React.FC = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const addAccident = useAccidentStore(
    (state: AccidentStoreState) => state.addAccident
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState<string>("");

  // Check if all fields are filled
  useEffect(() => {
    if (make && model && year && vehicleNumber && selectedImage) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [make, model, year, vehicleNumber, selectedImage]);

  useEffect(() => {
    async function getCurrentAppLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location access permission was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentAppLocation();
  }, []);

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    if (isSubmitting) {
      return; // If a submission is in progress, exit the function
    }

    setIsSubmitting(true);

    // Launch image picker
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
    setIsSubmitting(false);
  };

  const submit = async () => {
    if (!isFormValid) {
      Alert.alert("Incomplete Fields", "Please fill in all fields.");
      return;
    }

    if (isSubmitting) {
      return; // Prevent submitting if already submitting
    }

    setIsSubmitting(true); // Set to true to prevent multiple submissions

    try {
      let location = await Location.getCurrentPositionAsync({});
      const address = await getAddress({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      });

      console.log("address", address);

      const data: AccidentItemProps = {
        id: selectedImage + "id",
        make: make,
        model: model,
        year: year,
        vehicleNumber: vehicleNumber,
        imageUri: selectedImage,
        location: address
      };

      addAccident(data);
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting form", error);
      Alert.alert("Error", "There was an error submitting the form.");
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  const getAddress = async (location: any) => {
    const raw = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lon}&apiKey=2736685254f54de89108c918fb1f217f`
    );
    const data = await raw.json();
    console.log("Data ", data.features[0].properties.formatted);
    return data.features[0].properties.formatted;
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", padding: 20, display: "flex", gap: 5 }}>
        <TextInput
          style={styles.textInp}
          placeholderTextColor={"gray"}
          placeholder="Make"
          onChangeText={(newText) => setMake(newText)}
          defaultValue={make}
        />
        <TextInput
          style={styles.textInp}
          placeholderTextColor={"gray"}
          placeholder="Model"
          onChangeText={(newText) => setModel(newText)}
          defaultValue={model}
        />
        <TextInput
          style={styles.textInp}
          placeholderTextColor={"gray"}
          placeholder="Year"
          onChangeText={(newText) => setYear(newText)}
          defaultValue={year}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textInp}
          placeholderTextColor={"gray"}
          placeholder="Vehicle Number"
          onChangeText={(newText) => setVehicleNumber(newText)}
          defaultValue={vehicleNumber}
        />
      </View>

      <Button title="Choose an Image" onPress={pickImage} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isFormValid ? "#2877ff" : "#7a7a7a" }]}
        onPress={submit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00000",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  textInp: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    padding: 20,
    width: "90%",
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Details;
