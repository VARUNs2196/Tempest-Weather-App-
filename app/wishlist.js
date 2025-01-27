import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [filteredWishlist, setFilteredWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cityToRemove, setCityToRemove] = useState(null);
  const navigation = useNavigation();
  const apiKey = "6fd3173e13da36747a1f6b6d9dd2cef8"; // Replace with your API key

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem("wishlist");
        if (storedWishlist) {
          const parsedWishlist = JSON.parse(storedWishlist);
          setWishlist(parsedWishlist);
          setFilteredWishlist(parsedWishlist);
        }
      } catch (error) {
        console.error("Failed to load wishlist", error);
      }
    };
    loadWishlist();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSuggestions([]);
    } else {
      fetchCitySuggestions(searchQuery);
    }
  }, [searchQuery]);

  const fetchCitySuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );
      const cities = response.data.map((location) => ({
        name: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
      }));
      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const addCityToWishlist = async (city) => {
    if (!wishlist.includes(city.name)) {
      try {
        const updatedWishlist = [...wishlist, city.name];
        setWishlist(updatedWishlist);
        setFilteredWishlist(updatedWishlist);
        await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setSearchQuery("");
        setSuggestions([]);
      } catch (error) {
        console.error("Failed to add city to wishlist", error);
      }
    } else {
      alert("City is already in the wishlist.");
    }
  };

  const confirmRemoveCity = (city) => {
    setCityToRemove(city);
    setIsModalVisible(true);
  };

  const handleRemoveCity = async () => {
    try {
      const updatedWishlist = wishlist.filter((item) => item !== cityToRemove);
      setWishlist(updatedWishlist);
      setFilteredWishlist(updatedWishlist);
      await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to remove city from wishlist", error);
    }
  };

  return (
    <LinearGradient colors={["#000000", "#001A44"]} style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.iconInHeader}
        />
        <Text style={styles.title}>Wishlist</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search city..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => addCityToWishlist(item)}
              >
                <Text style={styles.suggestionText}>
                  {item.name}, {item.country}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        )}

        <ScrollView>
          {filteredWishlist.map((city, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                onPress={() => navigation.navigate("index", { city })}
                style={styles.cityContainer}
              >
                <Text style={styles.cityName}>{city}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmRemoveCity(city)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Custom Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Remove City</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to remove {cityToRemove} from your wishlist?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRemoveCity}
                style={styles.removeButtonModal}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 16 ,margin:"auto"},
  iconInHeader: { width: 50, height: 50, position: "absolute", top: "1%", left: "2%" },
  searchInput: {
    height: 40,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
    color: "white",
  },
  suggestionsList: {
    maxHeight: 120,
    backgroundColor: "#1A1A2E",
    borderRadius: 8,
    marginBottom: 16,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  suggestionText: {
    color: "white",
  },
  card: {
    backgroundColor: "#1A1A2E",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityContainer: { flex: 1 },
  cityName: { fontSize: 20, color: "white" },
  removeButton: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: { color: "white", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#1A1A2E",
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  modalMessage: { fontSize: 16, color: "white", marginBottom: 20 },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#888",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  removeButtonModal: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

