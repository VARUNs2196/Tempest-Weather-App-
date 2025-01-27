import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Video } from "expo-av";
import WeatherApp from "./weather";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import axios from "axios";
import countries from "i18n-iso-countries";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { city: selectedCity } = route.params || { city: "Delhi" };

  const [country, setCountry] = useState("");
  const [isDayMode, setIsDayMode] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [scale] = useState(new Animated.Value(1)); // Add animated scale

  const splashScreenShown = useRef(false); // This will track if the splash screen has been shown

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        LexendGiga: require("../assets/fonts/LexendGiga.ttf"),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts", error);
    }
  };

  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  const fetchCountry = async (city) => {
    const apiKey = "6fd3173e13da36747a1f6b6d9dd2cef8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      const countryCode = data.sys.country;
      const countryName = countries.getName(countryCode, "en");
      setCountry(countryName || "N/A");
    } catch (error) {
      console.error("Error fetching country:", error);
      setCountry("N/A");
    }
  };

  useEffect(() => {
    loadFonts();
    fetchCountry(selectedCity);

    // Only show splash screen on first render
    if (!splashScreenShown.current) {
      splashScreenShown.current = true;

      // Animate scale to simulate a smoother transition
      setTimeout(() => {
        Animated.timing(scale, {
          toValue: 0.95, // Shrink the video
          duration: 1500, // Smooth animation
          useNativeDriver: true,
        }).start();
      }, 3000);

      // Hide splash screen after 4 seconds
      setTimeout(() => setShowSplash(false), 4000);
    }
  }, []); // Empty dependency array ensures it runs only once after the component mounts

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      {showSplash ? (
        <Animated.View
          style={[
            styles.splashScreen,
            { transform: [{ scale }] }, // Apply scaling animation
          ]}
        >
          <Video
            source={require("../assets/images/tempest.mp4")}
            style={styles.fullscreenVideo}
            resizeMode="contain" // Keep it covering the screen
            shouldPlay
            isLooping={false}
          />
        </Animated.View>
      ) : (
        <LinearGradient
          colors={isDayMode ? ["#5CA9D6", "#FFB59E"] : ["#000000", "#001A44"]}
          style={styles.background}
        >
          <View style={styles.header}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.iconInHeader}
            />
            <Text style={styles.selectedCity}>
              {selectedCity}, {country}
            </Text>

            {/* Link to Wishlist */}
            <Link href="/wishlist" style={styles.iconLink}>
              <Image
                source={
                  isDayMode
                    ? require("../assets/images/nightWishlist.png")
                    : require("../assets/images/dayWishlist.png")
                }
                style={styles.wishlistIcon}
              />
            </Link>

            <Text style={styles.selectedDate}>{currentDate}</Text>
          </View>

          <WeatherApp city={selectedCity} setIsDayMode={setIsDayMode} />
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  fullscreenVideo: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  background: {
    flex: 1,
  },
  header: {
    margin: 0,
    position: "relative",
    flexDirection: "row", // Align items horizontally
    alignItems: "flex-start", // Align items to the top
    paddingRight: 10,
  },
  iconInHeader: {
    width: 50,
    height: 50,
    position: "absolute",
    top: "19%",
    left: "4",
  },
  selectedCity: {
    fontFamily: "LexendGiga",
    fontSize: 25,
    color: "#fff",
    marginLeft: 70,
    flexWrap: "wrap", // Ensure wrapping if needed
    width: width * 0.64, // Restrict width to avoid overlap
    top:"25%"
  },
  
  selectedDate: {
    fontFamily: "LexendGiga",
    fontSize: 20,
    color: "#fff",
    marginLeft: 70,
    top: "125%",
    position:"absolute"
  },
  iconLink: {
    position: "absolute",
    top: "30%",
    right: "2%",
    padding: 0,
    margin: 0,
  },
  wishlistIcon: {
    width: width * 0.148,
    height: height * 0.05,
  },
});

export default MainScreen;
