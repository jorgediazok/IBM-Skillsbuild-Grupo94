import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function Weather({ weatherData }) {
  const {
    weather,
    visibility,
    weather: [{ description, icon }],
    name,
    main: { temp, humidity, feels_like },
    wind: { speed },
    sys: { sunrise, sunset },
  } = weatherData;
  const [{ main }] = weather;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='darkgray' />

      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>{temp} °C</Text>
        </View>
        {/* <Text style={styles.currentDescription}>{description}</Text> */}
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../assets/temp.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              {feels_like} °C
            </Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              Sensación térmica
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../assets/humidity.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              {humidity}%
            </Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              Humedad
            </Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../assets/visibility.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{ fontSize: 22, color: 'white', textAlign: 'center' }}>
              {visibility}
            </Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              Visibilidad
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../assets/windspeed.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              {speed} m/s
            </Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              Viento
            </Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../assets/sunrise.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              {new Date(sunrise * 1000).toLocaleString()}
            </Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              Amanecer
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../assets/sunset.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              {new Date(sunset * 1000).toLocaleString()}
            </Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              Atardecer
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    backgroundColor: '#142950',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  headerText: {
    fontSize: 16,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  largeIcon: {
    width: 150,
    height: 100,
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  currentDescription: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 36,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
  },
});
