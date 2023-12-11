// Search.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherComponent from './components/WeatherComponent.js';
export default function App() {
return (
  <WeatherComponent />

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});