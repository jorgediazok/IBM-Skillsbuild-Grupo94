import React, { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CityItem from './components/CityItem';
import CityItemEmpty from './components/CityItemEmpty';

const Search = () => {
  const [city, setCity] = useState('');
  const [cityItems, setCityItems] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');

  // const fetchCities = async (text) => {
  //   setCity(text);
  //   const response = await axios.get(
  //     'https://autocomplete.wunderground.com/aq?query=' + text
  //   );
  // };

  // const fetchPosts = () => {
  //   const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setFilteredCities(responseJson);
  //       setMasterData(responseJson);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchPosts();
  //   return () => {};
  // }, []);

  // const ItemView = ({ item }) => {
  //   return (
  //     <View style={{ width: '80%', marginLeft: 35 }}>
  //       <Text style={styles.itemStyle}>
  //         {item.id}
  //         {'. '}
  //         {item.title.toUpperCase()}
  //       </Text>
  //       <Button mode='contained' onPress={() => alert('Clickeaste')}>
  //         +
  //       </Button>
  //     </View>
  //   );
  // };

  //ADDING A CITY
  const handleAddCity = () => {
    Keyboard.dismiss();
    setCityItems([...cityItems, city]);
    setCity('');
  };

  //FILTERING CITIES
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredCities(newData);
      setSearch(text);
    } else {
      setFilteredCities(masterData);
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
          // value={search}
          value={city}
          underlineColorAndroid='transparent'
          // onChangeText={(text) => searchFilter(text)}
          onChangeText={(text) => setCity(text)}
        />
        <TouchableOpacity onPress={() => handleAddCity()}>
          <View style={styles.addButtonWrapper}>
            <Text style={styles.addButton}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* <FlatList
          data={filteredCities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        /> */}

      <Text style={styles.title}>Tus Ciudades</Text>
      <View style={styles.addedCities}>
        {cityItems.length === 0 ? (
          <CityItemEmpty />
        ) : (
          cityItems
            .map((cityItem, index) => (
              <CityItem
                city={cityItem}
                key={index}
                handleDelete={handleDelete}
                index={index}
              />
            ))
            .reverse()
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
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
