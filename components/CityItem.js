import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapIcon from 'react-native-vector-icons/FontAwesome';

const CityItem = ({ city, handleDelete, index, handleSearch, fetchCities }) => {
  return (
    <View style={styles.city}>
      <View style={styles.cityLeft}>
        <View style={styles.cityMap}>
          <MapIcon name='map-marker' color='black' size={22} />
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
    </View>
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
});
