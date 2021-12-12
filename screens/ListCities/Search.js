import React, { useState } from 'react';
//AXIOS
import axios from 'axios';

import {
  TextInput,
  StyleSheet,
  Keyboard,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CityItem from '../../components/CityItem';
import CityItemEmpty from '../../components/CityItemEmpty';
import envs from '../../config/env';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [cityItems, setCityItems] = useState([]);
  const [locations, setLocations] = useState({});
  const [filteredCities, setFilteredCities] = useState(null);
  const [search, setSearch] = useState('');
  const [newCityText, setNewCityText] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const { REACT_APP_WEATHER_API } = envs;
  const API_KEY = 'df9cb797703364f9c6cdde8025ca1416';
  //ADDING A CITY TO THE LIST
  const handleAddCity = async () => {
    setLoading(true);
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${newCityText}&appid=${API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      setCityItems([...cityItems, response.data.name]);
      setLocations({
        ...locations,
        [response.data.name]: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
        },
      });

      setNewCityText('');
    } catch (error) {
      Alert.alert(
        'Error',
        'La ciudad no existe. Por favor agregue otra ciudad.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      setNewCityText('');
    }
    setLoading(false);
  };

  //RENDERING
  const renderItems = () => {
    if (cityItems.length === 0) {
      return <CityItemEmpty />;
    }

    if (filteredCities && filteredCities.length === 0) {
      return <CityItemEmpty />;
    }

    if (filteredCities && filteredCities.length > 0) {
      return filteredCities
        .map((cityItem, index) => (
          <CityItem
            city={cityItem}
            key={index}
            lonCoords={locations[selectedCity]?.lon}
            latCoords={locations[selectedCity]?.lat}
            handleDelete={handleDelete}
            index={index}
            setSelectedCity={setSelectedCity}
          />
        ))
        .reverse();
    }

    return cityItems
      .map((cityItem, index) => (
        <CityItem
          city={cityItem}
          key={index}
          lonCoords={locations[selectedCity]?.lon}
          latCoords={locations[selectedCity]?.lat}
          handleDelete={handleDelete}
          index={index}
          setSelectedCity={setSelectedCity}
        />
      ))
      .reverse();
  };

  //FILTERING CITIES
  const handleSearch = (text, index) => {
    if (text.length >= 2) {
      setFilteredCities(
        cityItems.filter((city) => {
          return (
            city.charAt(index).toLowerCase() ===
            text.charAt(index).toLowerCase()
          );
        })
      );
    } else {
      setFilteredCities(null);
    }
    setSearch(text);
  };

  //DELETING A CITY
  const handleDelete = (index) => {
    let items = [...cityItems];
    items.splice(index, 1);
    setCityItems(items);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
          width: '90%',
          marginLeft: 15,
        }}
      >
        <Ionicons
          name='add-outline'
          size={22}
          style={styles.iconOne}
          color='grey'
          onPress={() => {
            handleAddCity();
            Keyboard.dismiss();
          }}
        />

        <TextInput
          style={styles.textInputStyle}
          placeholder='Agregar ciudad'
          value={newCityText}
          autoFocus
          underlineColorAndroid='transparent'
          onChangeText={(text) => setNewCityText(text)}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          width: '90%',
          marginLeft: 15,
        }}
      >
        <Ionicons name='search' size={22} style={styles.iconOne} color='grey' />

        <TextInput
          style={styles.textInputStyle}
          placeholder='Buscar ciudad'
          value={search}
          underlineColorAndroid='transparent'
          onChangeText={(text) => handleSearch(text)}
        />
      </View>

      <Text style={styles.title}>Lista de Ciudades</Text>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center' }}
          size='large'
          color='#0000ff'
        />
      ) : (
        <View style={styles.addedCities}>{renderItems()}</View>
      )}
    </View>
  );
};

export default Search;

//STYLES
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    zIndex: 300,
    color: '#142950',
    textDecorationLine: 'underline',
  },
  addedCities: {
    paddingTop: 30,
    paddingHorizontal: 20,
    color: '#142950',
  },
  itemStyle: { padding: 15 },
  iconOne: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    left: '87%',
  },
  textInputStyle: {
    position: 'relative',
    width: '100%',
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: '#142950',
    backgroundColor: 'white',
  },
  addButtonWrapper: {
    width: 40,
    height: 40,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginLeft: 5,
  },
  addButton: {
    fontWeight: 'bold',
  },
});
