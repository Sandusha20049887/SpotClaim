import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Define a type for location state
interface LocationType {
    latitude: number;
    longitude: number;
  }

const serviceLocationsComponent = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Request for location permission and fetch the current location
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    };

    getLocation();
  }, []);

  const dublinLocations = [
    { title: 'Service Area 1', latitude: 53.349805, longitude: -6.26031 },
    { title: 'Service Area 5', latitude: 53.387835, longitude: -6.21071 },
    { title: 'Service Area 7', latitude: 53.357634, longitude: -6.29016 },
  ];

  // Displaying loading message while the location is being fetched
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
         {dublinLocations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.title}
            pinColor={'blue'} 
            >
            <Callout>
              <Text>{loc.title}</Text>
            </Callout>
          </Marker>
        ))}
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default serviceLocationsComponent;
