import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import API_KEYS from '../config/apiKeys';


const meteoConceptKey = API_KEYS.meteoConcept;

const cityId = 'Rennes';
const apiKey = meteoConceptKey;


const WeatherComponent = () => {
  const [citiesData, setCitiesData] = useState(null); // Déclaration de citiesData

    useEffect(() => {
    const fetchWeatherData = async () => {
        try {
        const response = await axios.get(
            `https://api.meteo-concept.com/api/location/cities?token=${apiKey}&search=${cityId}`
        );
        setCitiesData(response.data.cities); // Stocker les données dans l'état local
        } catch (error) {
        console.error('Error fetching weather data:', error);
        }
    };

    fetchWeatherData();
    }, []);

    return (
    <View>
        {citiesData ? (
        citiesData.map((city, index) => (
            <View key={index}>
            <Text>Ville: {city.name}</Text>
            <Text>Code postal: {city.cp}</Text>
            <Text>Latitude: {city.latitude}</Text>
            <Text>Longitude: {city.longitude}</Text>
            </View>
        ))
        ) : (
        <Text>Chargement des données des villes...</Text>
        )}
    </View>
    );
};

export default WeatherComponent;