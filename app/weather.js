import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const WeatherApp = ({ city, setIsDayMode }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(false);  

  const API_KEY = "6fd3173e13da36747a1f6b6d9dd2cef8";

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`;
      const weatherResponse = await axios.get(weatherUrl);
      const weatherData = weatherResponse.data;
  
      const { lat, lon, timezone } = weatherData.coord; // Get timezone offset
  
      // Calculate local time using the city's timezone
      const localTime = new Date((new Date().getTime() + timezone * 1000)); // Adjust time by timezone offset
      const hour = localTime.getHours();
      
      // Set isDayMode based on the local time of the city
      const isDayTime = hour >= 6 && hour < 18;
      setIsDay(isDayTime);
      
      // Fetch air pollution and hourly forecast data
      const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const airPollutionResponse = await axios.get(airPollutionUrl);
  
      const hourlyForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const hourlyForecastResponse = await axios.get(hourlyForecastUrl);
  
      setWeatherData({
        ...weatherData,
        airQuality: airPollutionResponse.data.list[0].main.aqi,
      });
  
      setHourlyData(hourlyForecastResponse.data.list.slice(0, 12));
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); 
    return () => clearInterval(interval);
  }, [city]);

  const getAQIDescription = (aqi) => {
    const descriptions = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return descriptions[aqi - 1] || "N/A";
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#007AFF" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchWeather} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { main, weather, wind, visibility } = weatherData;
  const { temp, feels_like, humidity, pressure,sea_level } = main;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <View style={styles.container}>
      <WeatherCard
        temperature={temp}
        weather={weather[0].description}
        imageUri={{ uri: weatherIcon }}
        airQuality={getAQIDescription(weatherData.airQuality)}
        isDay={isDay} // Pass the isDay value
      />
      <View style={styles.wrapSmallCard}>
        <SmallCard value={`${humidity}%`} label="Humidity" icon={require("../assets/images/humidity.png")} />
        <SmallCard value={`${wind.speed} m/s`} label="Wind Speed" icon={require("../assets/images/windSpeed.png")} />
        <SmallCard value={`${feels_like}°C`} label="Feels Like" icon={require("../assets/images/tempFeels.png")} />
        <SmallCard value={`${pressure} hPa`} label="Air Pressure" icon={require("../assets/images/airPressure.png")} />
        <SmallCard value={`${visibility / 1000} km`} label="Visibility" icon={require("../assets/images/visibility.png")} />
        <SmallCard value={`${sea_level}`} label="Sea Level" icon={require("../assets/images/seaIcon.png")} />
      </View>
      <Text style={[styles.sectionTitle,{color: isDay ? 'black' : 'white'}]}>Hourly Forecast
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
        {hourlyData.map((hour, index) => (
          <HourlyCard
            key={index}
            time={new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            temperature={`${hour.main.temp}°C`}
            icon={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const WeatherCard = ({ temperature, weather, imageUri, airQuality, isDay }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTemperature}>{temperature}°C</Text>
        <Text style={styles.cardWeather}>{weather}</Text>
        <Text style={styles.cardAir}>Air Quality: {airQuality}</Text>

      </View>
      <Image source={imageUri} style={styles.cardImage} />
    </View>
  );
};

const SmallCard = ({ value, label, icon }) => {
  return (
    <View>
      <View style={styles.smallCard}>
        <Image source={icon} style={styles.smallCardImage} />
        <Text style={styles.smallCardValue}>{value}</Text>
      </View>
      <View><Text style={styles.smallCardlabel}>{label}</Text></View>

    </View>
    
  );
};

const HourlyCard = ({ time, temperature, icon }) => {
  return (
    <View style={styles.hourlyCard}>
      <Text style={styles.hourlyTime}>{time}</Text>
      <Image source={{ uri: icon }} style={styles.hourlyImage} />
      <Text style={styles.hourlyTemp}>{temperature}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: "16%",
    padding: 15,
    top: "6%",
    alignItems: "center",
  },
  cardContent: { flex: 1 },
  cardTemperature: { fontSize: 32, fontWeight: "bold", color: "#333" },
  cardWeather: { fontSize: 18, color: "#666", marginTop: 5, textTransform: "capitalize" },
  cardAir: { fontSize: 15, color: "#666", marginTop: 5 },
  cardDayNight: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  cardImage: { width: 80, height: 80 },
  wrapSmallCard: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smallCard: {
    width: width * 0.224,
    height: height * 0.14,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    marginHorizontal: width * 0.03,
  },
  smallCardValue: { fontSize: 14, fontWeight: "bold", color: "#333", marginTop: 5 },
  smallCardImage: { width: "110%", height: "60%", resizeMode: "contain" },
  smallCardlabel:{fontSize: 14.5, fontWeight: "bold", color: "#333", margin:"auto"},
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: "5%",marginBottom:"2%" },
  hourlyScroll: { marginVertical: "1%" },
  hourlyCard: {
    width: width * 0.2,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  hourlyTime: { fontSize: 12, color: "#333" },
  hourlyImage: { width: 40, height: 40, marginVertical: 5 },
  hourlyTemp: { fontSize: 14, fontWeight: "bold", color: "#333" },
});

export default WeatherApp;
