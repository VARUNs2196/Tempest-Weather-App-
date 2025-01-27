import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./index"; // Import your main screen
import Wishlist from "./wishlist"; // Import your wishlist screen
import MapScreen from "./MapScreen";

const Stack = createStackNavigator();

const App = () => {
 return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen name="Home" component={MainScreen} />
       <Stack.Screen name="Wishlist" component={Wishlist} /> {/* Ensure this screen is properly registered */}
       <Stack.Screen name="MapScreen" component={MapScreen} /> 
     </Stack.Navigator>
   </NavigationContainer>
 );
};

export default App;
