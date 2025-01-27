import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleAddCity = () => {
    if (selectedLocation) {
      // Use a reverse geocoding API to get the city name from coordinates
      const cityName = `Lat: ${selectedLocation.latitude.toFixed(
        2
      )}, Lng: ${selectedLocation.longitude.toFixed(2)}`; // Replace this with real city name
      navigation.navigate("Wishlist", { cityName });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            description="Tap 'Add City' to save"
          />
        )}
      </MapView>
      {selectedLocation && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddCity}>
          <Text style={styles.addButtonText}>Add City</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
  },
  addButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
