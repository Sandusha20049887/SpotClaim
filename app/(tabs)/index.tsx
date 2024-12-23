import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import useAccidentStore from "../store/accidentStore";
import AccidentStoreState from "../store/accidentStoreState";
import AsyncStorage from "@react-native-async-storage/async-storage";
const vehicleData = {
  vehicle: {
    make: "Toyota",
    model: "Corolla",
    year: "2018",
    faultDescription: "Engine overheating after 20 minutes of driving.",
    garageDetails: {
      garageName: "AutoFix Solutions",
      garageAddress: "123 Main Street, Dublin, Ireland",
      contactNo: "+353 123 4567",
    },
    status: "Progressing",
    image:
      "https://media.istockphoto.com/id/1435226078/photo/front-of-a-white-bmw-m4-parked-on-a-street-with-trees-in-the-background.jpg?s=612x612&w=0&k=20&c=l1IupUrh-_Zbcse-hDkaUAh-qMD82hJspXjnN0IBZlg=",
  },
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    make: "Toyota",
    model: "Corolla",
    year: "2018",
    vehicleNumber: "DUB-1234",
    location: "23,north strand,dublin 03, Dublin",
    imageUri:
      "https://media.istockphoto.com/id/1435226078/photo/front-of-a-white-bmw-m4-parked-on-a-street-with-trees-in-the-background.jpg?s=612x612&w=0&k=20&c=l1IupUrh-_Zbcse-hDkaUAh-qMD82hJspXjnN0IBZlg=",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    make: "Honda",
    model: "Civic",
    year: "2019",
    vehicleNumber: "DUB-5678",
    location: "23,north strand,dublin 03, Dublin",
    imageUri:
      "https://media.istockphoto.com/id/1435226078/photo/front-of-a-white-bmw-m4-parked-on-a-street-with-trees-in-the-background.jpg?s=612x612&w=0&k=20&c=l1IupUrh-_Zbcse-hDkaUAh-qMD82hJspXjnN0IBZlg=",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    make: "Ford",
    model: "Fiesta",
    year: "2020",
    vehicleNumber: "DUB-9012",
    location: "23,north strand,dublin 03, Dublin",
    imageUri:
      "https://media.istockphoto.com/id/1435226078/photo/front-of-a-white-bmw-m4-parked-on-a-street-with-trees-in-the-background.jpg?s=612x612&w=0&k=20&c=l1IupUrh-_Zbcse-hDkaUAh-qMD82hJspXjnN0IBZlg=",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bas",
    make: "Toyota",
    model: "Corolla",
    year: "2018",
    vehicleNumber: "DUB-1234",
    location: "23,north strand,dublin 03, Dublin",
    imageUri:
      "https://media.istockphoto.com/id/1435226078/photo/front-of-a-white-bmw-m4-parked-on-a-street-with-trees-in-the-background.jpg?s=612x612&w=0&k=20&c=l1IupUrh-_Zbcse-hDkaUAh-qMD82hJspXjnN0IBZlg=",
  },
];

interface AccidentItemProps {
  make: string;
  model: string;
  year: string;
  vehicleNumber: string;
  imageUri: string;
  location: any;
}

export default function Index() {

  useEffect(() => {
    
    SplashScreen.preventAutoHideAsync();

    // delay 2 sec splash screen
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000); 
  }, []);
  
  const accidents = useAccidentStore(
    (state: AccidentStoreState) => state.accidents
  );
  useEffect(() => {
    //console.log(" accidents ", accidents);
    // AsyncStorage.clear();
  }, [accidents]);
  const navigation: any = useNavigation();

  const { make, model, year, faultDescription, garageDetails, status, image } =
    vehicleData.vehicle;
  return (
    <View style={styles.container}>
      <FlatList
        data={accidents}
        renderItem={({ item }: any) => (
          <>
            <View style={styles.item}>
              <View>
                <Image source={{ uri: item.imageUri }} style={styles.image} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{`${item.make} ${item.model}`}</Text>
                <Text style={styles.detail}>Year: {item.year}</Text>
                <Text style={styles.detail}>
                  Vehicle Number: {item.vehicleNumber}
                </Text>
                <Text style={styles.detail}>Location: {item.location}</Text>
              </View>
            </View>
          </>
        )}
        keyExtractor={(item: any) => item.id}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Details")}
      >
        <Ionicons name="camera" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  item: {
    flexDirection: "row", 
    alignItems: "flex-start", 
    width: "100%", 
    padding: 10, 
    marginTop: 10, 
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  details: {
    flex: 1, 
    backgroundColor: "transparent",
    justifyContent: "space-around", 
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  detail: {
    fontSize: 15,
    color: "gray",
    flexWrap: "wrap", 
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

