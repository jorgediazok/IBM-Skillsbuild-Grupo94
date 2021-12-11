import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoIcon from 'react-native-vector-icons/FontAwesome';
import MapIcon from 'react-native-vector-icons/FontAwesome';
import Map from '../components/Map';
import Weather from './Weather';
const API_KEY = 'df9cb797703364f9c6cdde8025ca1416';

const CityItem = ({
  city,
  handleDelete,
  index,
  lonCoords,
  latCoords,
  setSelectedCity,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMapVisible, setModalMapVisible] = useState(false);
  var alVisible = false;
  const [loaded, setLoaded] = useState(true);

  const selectCity = (city) => {
    setSelectedCity(city);
  };

  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(city) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
        setModalVisible(true);
      } else {
        setWeatherData((await response).status);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  function closeUp() {
    alVisible = false;
    console.log(alVisible);
  }

  if (weatherData != null) {
    const {
      weather,
      visibility,
      weather: [{ description, icon }],
      name,
      main: { temp, humidity, feels_like },
      wind: { speed },
      sys: { sunrise, sunset },
    } = weatherData;
  }

  return (
    <>
      {modalVisible && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Keyboard.dismiss();
            setModalVisible(!modalVisible);
          }}
        >
          <Weather weatherData={weatherData} />
        </Modal>
      )}

      {modalMapVisible && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalMapVisible}
          onRequestClose={() => {
            Keyboard.dismiss();
            setModalMapVisible(!modalMapVisible);
          }}
        >
          <Map
            lonCoords={lonCoords}
            latCoords={latCoords}
            city={city}
            index={index}
          />
        </Modal>
      )}

      <View style={styles.city}>
        <View style={styles.cityLeft}>
          <View style={styles.cityInfo}>
            <InfoIcon
              id={city}
              name='info'
              color='black'
              size={20}
              onPress={() => {
                selectCity(city);
                fetchWeatherData(city);
              }}
            />
          </View>
          <Text style={styles.cityText}>{city}</Text>
        </View>

        <View style={styles.cityRight}>
          <View style={styles.cityMap}>
            <MapIcon
              id={city}
              name='map-marker'
              color='black'
              size={20}
              onPress={() => {
                selectCity(city);
                setModalMapVisible(true);
              }}
            />
          </View>

          <View style={styles.cityDelete}>
            <Icon
              name='trash'
              size={20}
              color='#900'
              onPress={() => handleDelete(index)}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default CityItem;

const styles = StyleSheet.create({
  city: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  cityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cityRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cityInfo: {
    width: 24,
    height: 24,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    paddingTop: 3,
  },
  cityMap: {
    width: 24,
    height: 24,
    opacity: 0.4,
    borderRadius: 5,
    paddingTop: 2,
    marginRight: 5,
  },
  cityText: {
    maxWidth: '80%',
  },
  cityDelete: {
    width: 22,
    height: 22,
    borderRadius: 2,
  },
  modalC: {
    height: '100%',
  },
});
