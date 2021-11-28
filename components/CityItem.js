import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import { block } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapIcon from 'react-native-vector-icons/FontAwesome';
import Map from '../components/Map';
import Weather from './Weather';
const API_KEY = "df9cb797703364f9c6cdde8025ca1416";


const CityItem = ({
  city,
  handleDelete,
  index,
  lonCoords,
  latCoords,
  setSelectedCity,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  var alVisible = false;
  const [loaded, setLoaded] = useState(true);


  const selectCity = (city) => {
    setSelectedCity(city);
  };

  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(city) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    try {
        const response =  await fetch(API);
        if(response.status == 200) {
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

function closeUp(){
  alVisible =false;
  console.log(alVisible);
  
  
}

if (weatherData != null){
const { weather,
  visibility,
  weather: [{description, icon}],
  name,
  main: { temp, humidity, feels_like },
  wind: { speed },
  sys: { sunrise, sunset },
} = weatherData;
console.log(weatherData);

}
console.log(city);




  return (
    <>
      {modalVisible ? (
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
      ) : (
        <View style={styles.city}>
          <View style={styles.cityLeft}>
            <View style={styles.cityMap}>
              <MapIcon
                id={city}
                name='map-marker'
                color='black'
                size={22}
                onPress={() => {
                  selectCity(city);
                  fetchWeatherData(city);
                  
                  
                }}
              />
            </View>
            <Text style={styles.cityText}>{city}</Text>
          </View>

          <View style={styles.cityDelete}>
            <Icon
              name='trash'
              size={20}
              color='#900'
              onPress={() => handleDelete(index)}
            />
          </View>

          <View style={styles.cityDelete}>
            
            <Icon
            name='heartbeat'
            size={20}
            color='#900'
            onPress={() => {
              fetchWeatherData(city);
              Keyboard.dismiss();
              console.log(weatherData);
              console.log('weata');
            }}
            
          />
          
        </View>
        

        </View>
        
      )}
   
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
  },
  cityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cityMap: {
    width: 24,
    height: 24,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
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
    height: '100%'
  }
});
