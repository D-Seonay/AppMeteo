import * as React from 'react';
import { useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native'; // Import des composants nécessaires
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Api from '../models/Api';
import weatherCode from '../services/weatherCode';

const weatherIcons = {
  0: require('../assets/sunny.png'),
  1: require('../assets/cloudy.png'),
  2: require('../assets/cloudy.png'),
  3: require('../assets/cloudy.png'),
  4: require('../assets/cloudy.png'),
  5: require('../assets/cloudy.png'),
  6: require('../assets/fog.png'),
  7: require('../assets/fog.png'),
  10: require('../assets/rainy.png'),
  11: require('../assets/rainy.png'),
  12: require('../assets/rainy.png'),
  13: require('../assets/rainy.png'),
  14: require('../assets/rainy.png'),
  15: require('../assets/rainy.png'),
  16: require('../assets/fog.png'),

  20: require('../assets/snow.png'),
  21: require('../assets/snow.png'),
  22: require('../assets/snow.png'),
  30: require('../assets/snow.png'),
  31: require('../assets/snow.png'),
  32: require('../assets/snow.png'),

  40: require('../assets/rainy.png'),
  41: require('../assets/rainy.png'),
  42: require('../assets/rainy.png'),
  43: require('../assets/rainy.png'),
  44: require('../assets/rainy.png'),
  45: require('../assets/rainy.png'),
  46: require('../assets/rainy.png'),
  47: require('../assets/rainy.png'),
  48: require('../assets/rainy.png'),
  60: require('../assets/snow.png'),
  61: require('../assets/snow.png'),
  62: require('../assets/snow.png'),
  63: require('../assets/snow.png'),
  64: require('../assets/snow.png'),
  65: require('../assets/snow.png'),
  66: require('../assets/snow.png'),
  67: require('../assets/snow.png'),
  68: require('../assets/snow.png'),
  70: require('../assets/snow.png'),
  71: require('../assets/snow.png'),
  72: require('../assets/snow.png'),
  73: require('../assets/snow.png'),
  74: require('../assets/snow.png'),
  75: require('../assets/snow.png'),
  76: require('../assets/snow.png'),
  77: require('../assets/snow.png'),

  100: require('../assets/thunder.png'),
  101: require('../assets/thunder.png'),
  102: require('../assets/thunder.png'),
  103: require('../assets/thunder.png'),
  104: require('../assets/thunder.png'),
  105: require('../assets/thunder.png'),
  106: require('../assets/thunder.png'),
  107: require('../assets/thunder.png'),
  108: require('../assets/thunder.png'),
  120: require('../assets/thunder.png'),
  121: require('../assets/thunder.png'),
  122: require('../assets/thunder.png'),
  123: require('../assets/thunder.png'),
  124: require('../assets/thunder.png'),
  125: require('../assets/thunder.png'),
  126: require('../assets/thunder.png'),
  127: require('../assets/thunder.png'),
  128: require('../assets/thunder.png'),
  130: require('../assets/thunder.png'),
  131: require('../assets/thunder.png'),
  132: require('../assets/thunder.png'),
  133: require('../assets/thunder.png'),
  134: require('../assets/thunder.png'),
  135: require('../assets/thunder.png'),
  136: require('../assets/thunder.png'),
  137: require('../assets/thunder.png'),
  138: require('../assets/thunder.png'),
  140: require('../assets/thunder.png'),
  141: require('../assets/thunder.png'),
  142: require('../assets/thunder.png'),
  
  210: require('../assets/rainy.png'),
  211: require('../assets/rainy.png'),
  212: require('../assets/rainy.png'),

  220: require('../assets/snow.png'),
  221: require('../assets/snow.png'),
  222: require('../assets/snow.png'),

  230: require('../assets/snow.png'),
  231: require('../assets/snow.png'),
  232: require('../assets/snow.png'),

  235: require('../assets/hail.png'),
};



const MeteoCity = ({ navigation, route }) => {
  const meteoAPI = new Api();

  const [meteoCityFor5Days, setMeteoCityFor5Days] = React.useState({});
  const [meteoCity, setMeteoCity] = React.useState({
    city: { name: '' },
    forecast: [
      [],
      [],
      [],
      [
        {
          cp: 93170,
          datetime: '2022-03-01T19:00:00+0100',
          day: 0,
          dirwind10m: 113,
          gust10m: 22,
          gustx: 22,
          insee: '93006',
          latitude: 48.8691,
          longitude: 2.4227,
          period: 3,
          probafog: 0,
          probafrost: 10,
          probarain: 20,
          probawind70: 0,
          probawind100: 0,
          rr1: 0,
          rr10: 0,
          temp2m: 10,
          weather: 5,
          wind10m: 5,
        },
      ],
    ],
  });

  const [loading, setLoading] = React.useState(true);
  const [isCelsius, setIsCelsius] = React.useState(true);

  useEffect(() => {
    getMeteoForCity(route.params.insee);
    getMeteoForCity5days(route.params.insee);
  }, []);

  const getMeteoForCity = async (insee) => {
    const result = await meteoAPI.getMeteoForCityForNextHour(insee);
    setMeteoCity(result);
    setLoading(false);
  };

  const getMeteoForCity5days = async (insee) => {
    const result = await meteoAPI.getMeteoForCityFor5Days(insee);
    setMeteoCityFor5Days(result);
  };

  const dateFormat = (dateISO) => {
    const date = new Date(dateISO);
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  };

  const convertTempUnit = (temp) => {
    if (isCelsius) {
      return temp + '˚C';
    } else {
      const fahrenheitTemp = (temp * 9) / 5 + 32;
      return fahrenheitTemp.toFixed(2) + '˚F';
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.previsionView} key={item.datetime}>
      <Text style={styles.previsionTitle}>{dateFormat(item.datetime)}</Text>
      <Image source={weatherIcons[item.weather]} style={styles.weatherIcon} />
      <Text>{weatherCode[item.weather]}</Text>  
      <Text>
        T°Max : {convertTempUnit(item.tmax)} T°Min : {convertTempUnit(item.tmin)}
      </Text>
      <Text>
        Rafale de vent à 10 mètres : {item.wind10m}
        {' km/h '}
      </Text>
    </View>
  );

  return (
    <>
      {!loading && (
        <>
          <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.tempText}>
                {meteoCity.city.name} {convertTempUnit(meteoCity.forecast[0][3].temp2m)}
              </Text>
              <Text style={styles.subtitle}>
                {weatherCode[meteoCity.forecast[0][3].weather]}
              </Text>
              <TouchableOpacity onPress={() => setIsCelsius(!isCelsius)}>
                <Text>Convertir température</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.weatherContainer}>
              <FlatList
                data={meteoCityFor5Days}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#add8e6',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
  previsionView: {
    backgroundColor: '#98D7DC',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previsionTitle: {
    fontSize: 20,
    marginBottom: 3,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default MeteoCity;
