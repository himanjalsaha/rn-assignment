// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import Details from './components/Details';
import { ThemeProvider, useTheme } from './context/Themecontext';



const Stack = createNativeStackNavigator();

function RootStack() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Stack.Navigator   screenOptions={{
      headerStyle: {
        backgroundColor: isDarkMode ? 'black' : 'white', // Change the header color here
      },
      headerTintColor: isDarkMode ? 'white' : 'black', // Change the header text color based on theme
    }}>
      <Stack.Screen name="Home" component={HomeScreen}  />
      <Stack.Screen name="details" component={Details} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
      <RootStack />
      </ThemeProvider>
    </NavigationContainer>
  );
}