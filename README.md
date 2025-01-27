# Tempest-Weather-App-
Weather App
Introduction
This is a weather app built with React Native and Expo. The app allows users to:

Forecast Weather: Get real-time weather updates for a city selected by the user.
Wishlist: Users can create a wishlist of their preferred cities and easily view their weather information.
Animated Splash Screen: A smooth animated video is displayed at the start of the app to enhance user experience.
Features
Search & Add Cities: Users can search for cities and add them to their wishlist.
Real-time Weather Data: The app shows current weather, air quality, wind speed, and more.
Hourly Forecast: View a forecast for the next 12 hours for each city.
Animated Splash Screen: Displays a beautiful animation on app startup.
Technologies Used
React Native: Framework used for building mobile applications.
Expo: Managed workflow for running and building React Native apps.
Axios: Used for making HTTP requests to fetch weather data from the OpenWeather API.
AsyncStorage: For storing users' wishlist data locally.
React Navigation: For navigation between screens.
LinearGradient: For adding gradient backgrounds to the app.
Setup & Installation
To run the Weather App on your local machine, follow the instructions below.

1. Clone the Repository
First, clone the repository to your local machine.

bash
Copy
git clone <repository-url>
cd weather-app
2. Install Dependencies
Make sure you have Node.js and npm installed on your machine.

To install the required dependencies for the app, run the following command in the project root directory:

bash
Copy
npm install
This command installs all the dependencies listed in the package.json file, including React Native, Expo, and other required libraries.

If you're using yarn, you can use the following command instead:

bash
Copy
yarn install
3. Running the App
Once the dependencies are installed, you can run the app on your device or simulator.

To start the app in development mode, run the following command:

bash
Copy
expo start
This will open Expo DevTools in your browser. You can scan the QR code displayed in the DevTools using the Expo Go app on your Android or iOS device to preview the app.

Alternatively, you can run the app on an iOS or Android simulator by following the instructions in Expo DevTools.

4. Customizing the API Key
The app uses the OpenWeather API to fetch weather and air quality data. To make requests, you'll need to use an API Key from OpenWeather.

Go to OpenWeather API and sign up for an API key.
Replace the placeholder API key in the wishlist.js and weather.js files with your own API key:
js
Copy
const apiKey = "your-api-key-here"; // Replace with your API key
5. Add Fonts
The app uses a custom font (LexendGiga). Make sure to download the font and place it in the assets/fonts/ directory. If the font is not required, you can remove the references to it in the code.

Folder Structure
bash
Copy
/assets
  /images         # App icons, images, and splash video
  /fonts          # Custom fonts used in the app
/src
  /components     # Reusable components across the app
  /screens        # Screens for different app views (Main, Wishlist, etc.)
  App.js          # Main app entry point
  index.js        # Main screen logic and weather API integration
  weather.js      # Weather data handling and display
  wishlist.js     # Wishlist functionality and city management
Tools and Libraries Used
Expo: Framework for building React Native apps.
React Navigation: For managing screen navigation.
Axios: For HTTP requests to OpenWeather API.
AsyncStorage: For storing the wishlist locally on the device.
LinearGradient: For creating gradient backgrounds.
React Native: Core framework for building the app.
