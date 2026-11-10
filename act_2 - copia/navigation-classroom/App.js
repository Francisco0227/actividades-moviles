import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import HomeStack from './assets/navigation/HomeStack';
import ProfileStack from './assets/navigation/ProfileStack';



const Tab = createBottomTabNavigator();
const USE_EXPO_ROUTER = false;

////






export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;

          if (route.name === 'Home'){
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size = {size} color={color} />;
        },

        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
     >
      <Tab.Screen name='Home' component={HomeStack} options={{ headerShown: false}} />
      <Tab.Screen name='Profile' component={ProfileStack} options= {{headerShown: false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


