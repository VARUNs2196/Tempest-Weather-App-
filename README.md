# Tempest-Weather-App-
# Weather App

## Introduction

This is a weather app built with React Native and Expo. The app allows users to:

- **Forecast Weather**: Get real-time weather updates for a city selected by the user.
- **Wishlist**: Users can create a wishlist of their preferred cities and easily view their weather information.
- **Animated Splash Screen**: A smooth animated video is displayed at the start of the app to enhance user experience.

## Features

- **Search & Add Cities**: Users can search for cities and add them to their wishlist.
- **Real-time Weather Data**: The app shows current weather, air quality, wind speed, and more.
- **Hourly Forecast**: View a forecast for the next 12 hours for each city.
- **Animated Splash Screen**: Displays a beautiful animation on app startup.

## Technologies Used

- **React Native**: Framework used for building mobile applications.
- **Expo**: Managed workflow for running and building React Native apps.
- **Axios**: Used for making HTTP requests to fetch weather data from the OpenWeather API.
- **AsyncStorage**: For storing users' wishlist data locally.
- **React Navigation**: For navigation between screens.
- **LinearGradient**: For adding gradient backgrounds to the app.

---

## Setup & Installation

To get started with this Weather App on your local machine, follow these steps:

### 1. Clone the Repository


Start by cloning the repository to your local machine. You can do this using the following command:

![image](https://github.com/user-attachments/assets/f390f295-cfcf-4d91-b5f3-1c1b2bf57b6f)


### 2. Install Dependencies

Make sure you have Node.js and npm installed on your machine.

To install the required dependencies for the app, run the following command in the project root directory:

![image](https://github.com/user-attachments/assets/5a2097eb-5c33-405b-ba11-5f355bc4ebcd)

This command installs all the dependencies listed in the `package.json` file, including React Native, Expo, and other required libraries.

If you're using `yarn`, you can use the following command instead:

![image](https://github.com/user-attachments/assets/21d06182-9714-468b-b4a4-dac308ef4e4c)

### 3. Running the App
Once the dependencies are installed, you can run the app on your device or simulator.

To start the app in development mode, run the following command:

![image](https://github.com/user-attachments/assets/f7ff049a-8ceb-40e4-850b-2f2a832a0676)

This will open Expo DevTools in your browser. You can scan the QR code displayed in the DevTools using the Expo Go app on your Android or iOS device to preview the app.

Alternatively, you can run the app on an iOS or Android simulator by following the instructions in Expo DevTools.

### 4. Customizing the API Key
The app uses the OpenWeather API to fetch weather and air quality data. To make requests, you'll need to use an API Key from OpenWeather.

1. Go to [OpenWeather API](https://openweathermap.org/) and sign up for an API key.
2. Replace the placeholder API key in the `wishlist.js` and `weather.js` files with your own API key:

![image](https://github.com/user-attachments/assets/c3b8ed7a-5667-4e3c-ab6e-2e8f9fef2a4f)

### 5. Add Fonts
The app uses a custom font (LexendGiga). Make sure to download the font and place it in the `assets/fonts/` directory. If the font is not required, you can remove the references to it in the code.

### Folder STructure

![image](https://github.com/user-attachments/assets/b378f877-20a0-45f1-8621-3c0e56bf213d)

## Tools and Libraries Used

- **Expo**: Framework for building React Native apps.
- **React Navigation**: For managing screen navigation.
- **Axios**: For HTTP requests to OpenWeather API.
- **AsyncStorage**: For storing the wishlist locally on the device.
- **LinearGradient**: For creating gradient backgrounds.
- **React Native**: Core framework for building the app.


