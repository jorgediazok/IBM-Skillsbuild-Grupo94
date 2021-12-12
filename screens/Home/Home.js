import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../../components/Styles';
import StylesButton from '../../components/SylesButton';
import * as Location from 'expo-location';

import Cities from '../ListCities/Search';
import Nosotros from '../Nosotros/Nosotros';
import DateTime from '../../components/CurrentDate/DateTime';
import WeatherScroll from '../../components/CurrentDate/WeatherScroll';
const API_KEY = '8fbf7d93eaa27eae0f86b576e3a148d2';
const img = require('../../assets/citydark.jpg');

const Home = ({ navigation }) => {
  const [dataDateTime, setDataDateTime] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi('-34.61315', '-58.37723');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDataDateTime(data);
        });
    }
  };

  return (
    <View style={Styles.container}>
      <ImageBackground source={img} style={Styles.imageHome}>
        <DateTime
          current={dataDateTime.current}
          timezone={dataDateTime.timezone}
          lat={dataDateTime.lat}
          lon={dataDateTime.lon}
        />

        <WeatherScroll weatherData={dataDateTime.daily} />
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={StylesButton.btnCity}>
            <Icon
              name='account-multiple'
              size={30}
              color='#FFF'
              onPress={() => navigation.navigate(Nosotros)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={StylesButton.btnCities}>
            <Icon
              name='home-city'
              size={30}
              color='#FFF'
              onPress={() => navigation.navigate(Cities)}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
