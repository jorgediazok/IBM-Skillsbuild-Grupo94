import React, { useEffect, useState, useMemo } from 'react';

//AXIOS
import axios from 'axios';

import { TextInput } from 'react-native-paper';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CityItem from './components/CityItem';
import CityItemEmpty from './components/CityItemEmpty';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [cityItems, setCityItems] = useState([]);
  const [latCoords, setLatCoords] = useState('');
  const [lonCoords, setLonCoords] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [search, setSearch] = useState('');

  const API_KEY = '6d42394a6467a3275912ccc02f5bd749';

  //ADDING A CITY TO THE LIST
  const handleAddCity = async (query) => {
    setLoading(true);
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      console.log(response);
      setCityItems([...cityItems, response.data.name]);
      setLatCoords(response.data.coord.lat);
      setLonCoords(response.data.coord.lon);
      setSearch('');
    } catch (error) {
      Alert.alert('Error.', 'La ciudad no existe.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      setSearch('');
    }
    setLoading(false);
  };

  console.log(cityItems);

  //FILTERING CITIES
  const handleSearch = (text) => {
    if (text) {
      const newData = cityItems?.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredCities(newData);
      setSearch(text);
    } else {
      setFilteredCities(cityItems);
      setSearch(text);
    }
  };

  //DELETING A CITY
  const handleDelete = (index) => {
    let items = [...cityItems];
    items.splice(index, 1);
    setCityItems(items);
  };

  return (
    <View style={styles.container}>
      <Ionicons name='location-sharp' size={22} style={styles.iconOne} />
      <KeyboardAvoidingView style={styles.addCitiesWrapper}>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Agregar ciudad'
          value={search}
          underlineColorAndroid='transparent'
          onChangeText={(text) => handleSearch(text)}
        />
        <TouchableOpacity onPress={() => handleAddCity(search)}>
          <View style={styles.addButtonWrapper}>
            <Text style={styles.addButton}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Text style={styles.title}>Tus Ciudades</Text>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center' }}
          size='large'
          color='#0000ff'
        />
      ) : (
        <View style={styles.addedCities}>
          {cityItems.length === 0 ? (
            <CityItemEmpty />
          ) : (
            cityItems
              .map((cityItem, index) => (
                <CityItem
                  city={cityItem}
                  key={index}
                  lonCoords={lonCoords}
                  latCoords={latCoords}
                  handleDelete={handleDelete}
                  index={index}
                />
              ))
              .reverse()
          )}
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 120,
    zIndex: 300,
  },
  addCitiesWrapper: {
    position: 'absolute',
    top: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addedCities: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  itemStyle: { padding: 15 },
  iconOne: {
    position: 'absolute',
    zIndex: 1,
    top: 58,
    left: 25,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 30,
    margin: 5,
    width: '75%',
    marginLeft: 15,
    marginTop: 40,
    borderColor: '#009688',
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
    marginTop: 32,
    marginRight: 15,
  },
  addButton: {
    fontWeight: 'bold',
  },
});
