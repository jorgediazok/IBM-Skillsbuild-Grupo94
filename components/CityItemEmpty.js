import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CityItemEmpty = () => {
  return (
    <View style={styles.city}>
      <View style={styles.cityLeft}>
        <Text style={styles.cityText}>No elegiste ninguna ciudad.</Text>
      </View>
    </View>
  );
};

export default CityItemEmpty;

const styles = StyleSheet.create({
  city: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
  },
  cityText: {
    maxWidth: '100%',
    textAlign: 'center',
  },
});
