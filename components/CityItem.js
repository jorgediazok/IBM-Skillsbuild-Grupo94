import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapIcon from 'react-native-vector-icons/FontAwesome';
import Map from '../components/Map';

const CityItem = ({
  city,
  handleDelete,
  index,
  lonCoords,
  latCoords,
  setSelectedCity,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectCity = (city) => {
    setSelectedCity(city);
  };

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
          <Map
            lonCoords={lonCoords}
            latCoords={latCoords}
            city={city}
            index={index}
          />
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
                  setModalVisible(true);
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
});
