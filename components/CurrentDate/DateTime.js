import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment-timezone';

const days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
const months = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];
import { ActivityIndicator } from 'react-native';

const WeatherItem = ({ title, value, unit }) => {
  return (
    <View style={styles.weatherItem}>
      <Text style={styles.weatherItemTitle}>{title}</Text>
      <Text style={styles.weatherItemTitleRight}>
        {value}
        {unit}
      </Text>
    </View>
  );
};

const DateTime = ({ current, lat, lon, timezone }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();

      setTime(
        (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) +
          ':' +
          (minutes < 10 ? '0' + minutes : minutes)
      );

      setDate(days[day] + ', ' + date + ' ' + months[month]);
    }, 1000);
  }, []);

  if (timezone)
    return (
      <View style={styles.container}>
        <View>
          <View>
            <Text style={styles.heading}>{time}</Text>
          </View>
          <View>
            <Text style={styles.subheading}>{date}</Text>
          </View>
          <View style={styles.weatherItemContainer}>
            <WeatherItem
              title='Humedad'
              value={current ? current.humidity : ''}
              unit='%'
            />
            <WeatherItem
              title='Presión'
              value={current ? current.pressure : ''}
              unit='hPA'
            />
            <WeatherItem
              title='Amanece'
              value={
                current
                  ? moment.tz(current.sunrise * 1000, timezone).format('HH:mm')
                  : ''
              }
              unit='am'
            />
            <WeatherItem
              title='Anochece'
              value={
                current
                  ? moment.tz(current.sunset * 1000, timezone).format('HH:mm')
                  : ''
              }
              unit='pm'
            />
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.timezone}>{timezone}</Text>
            <Text style={styles.latlong}>
              {lat} N / {lon} E
            </Text>
          </View>
        </View>
      </View>
    );
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        size='large'
        color='#0000ff'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.4,
    justifyContent: 'space-between',
  },
  heading: {
    textAlign: 'center',
    fontSize: 45,
    color: 'white',
    fontWeight: '100',
    marginTop: 10,
  },
  subheading: {
    textAlign: 'center',
    fontSize: 25,
    color: '#eee',
    fontWeight: '300',
  },
  rightAlign: {
    textAlign: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  timezone: {
    fontSize: 14,
    color: 'white',
    fontWeight: '700',
    justifyContent: 'center',
    textAlign: 'center',
  },
  latlong: {
    marginTop: 2,
    marginLeft: 47,
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  weatherItemContainer: {
    backgroundColor: '#18181b99',
    borderRadius: 10,
    padding: 25,
    marginTop: 10,
    width: 250,
    justifyContent: 'center',
  },
  weatherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 160,
  },
  weatherItemTitle: {
    color: '#eee',
    fontSize: 14,
    fontWeight: '100',
    marginLeft: 10,
  },
  weatherItemTitleRight: {
    color: '#eee',
    fontSize: 14,
    fontWeight: '100',
    marginRight: -20,
  },
  textApp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateTime;
