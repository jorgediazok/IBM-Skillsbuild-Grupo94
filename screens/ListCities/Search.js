import React, { useState, useEffect } from 'react';
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
  LogBox,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CityItem from '../../components/CityItem';
import CityItemEmpty from '../../components/CityItemEmpty';
import envs from '../../config/env';
import firebase from '../../components/Utils/firebase';

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

  const [ciudades, setCiudades] = useState([]);

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
      await firebase.db.collection('ciudades').add({
        nombre: response.data.name,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
        timestamp: firebase.firebase.firestore.FieldValue.serverTimestamp(),
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

  useEffect(() => {
    firebase.db
      .collection('ciudades')
      .orderBy('timestamp', 'desc')
      .onSnapshot((querySnapshot) => {
        const ciudades = [];
        querySnapshot.docs.forEach((doc) => {
          const { lat, lon, nombre } = doc.data();
          ciudades.push({
            id: doc.id,
            nombre,
            lat,
            lon,
          });
        });
        setCiudades(ciudades);
      });
  }, []);

  //RENDERING
  const renderItems = () => {
    if (ciudades.length === 0) {
      return <CityItemEmpty />;
    }

    if (filteredCities && filteredCities.length === 0) {
      return <CityItemEmpty />;
    }

    if (filteredCities && filteredCities.length > 0) {
      return filteredCities.map((cityItem, index) => (
        <CityItem
          city={cityItem.nombre}
          key={index}
          lonCoords={cityItem.lon}
          latCoords={cityItem.lat}
          handleDelete={deleteCiudad}
          index={cityItem.id}
          setSelectedCity={setSelectedCity}
        />
      ));
    }

    return ciudades.map((cityItem) => (
      <CityItem
        city={cityItem.nombre}
        key={cityItem.id}
        lonCoords={cityItem.lon}
        latCoords={cityItem.lat}
        handleDelete={deleteCiudad}
        index={cityItem.id}
        setSelectedCity={setSelectedCity}
      />
    ));
  };

  //FILTERING CITIES
  const handleSearch = (text, index) => {
    if (text.length >= 2) {
      setFilteredCities(
        ciudades.filter((city) => {
          var ciu = city.nombre;
          return (
            ciu.charAt(index).toLowerCase() === text.charAt(index).toLowerCase()
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

  const deleteCiudad = async (index) => {
    setLoading(true);
    const dbRef = firebase.db.collection('ciudades').doc(index);
    await dbRef.delete();
    setLoading(false);
  };

  LogBox.ignoreAllLogs();

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
    backgroundColor: '#142950',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    zIndex: 300,
    color: '#ffffff',
    textDecorationLine: 'underline',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
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
