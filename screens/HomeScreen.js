import React from 'react';
import { Image, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CricketScreen from './CricketScreen';
import FootballScreen from './FootballScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'lightblue',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
            headerTitleAlign: 'center',
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        >
          <Tab.Screen
            name="Cricket"
            component={CricketScreen}
            options={{
              headerTitle: 'Cricket Fixtures',
              headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <MaterialCommunityIcons name="reorder-horizontal" size={30} color="black" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }}>
                  <Fontisto name="search" size={26} color="black" />
                </TouchableOpacity>
              ),
              tabBarIcon: () => (
                <Image
                  source={require('../assets/cricket_tab_1.png')}
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Football"
            component={FootballScreen}
            options={{
              headerTitle: 'Football Fixtures',
              headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <MaterialCommunityIcons name="reorder-horizontal" size={30} color="black" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }}>
                  <Fontisto name="search" size={26} color="black" />
                </TouchableOpacity>
              ),
              tabBarIcon: () => (
                <Image
                  source={require('../assets/football_tab_1.png')}
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}