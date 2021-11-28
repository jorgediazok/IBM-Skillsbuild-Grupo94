import React from 'react';
import { View, Text, StatusBar, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

const Layout = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

const Colors = {
  theme: '#142950',
  white: '#fff',
  grey: '#a4a4a4',
};

export default function Nosotros() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar
        translucent={false}
        barStyle='light-content'
        backgroundColor={Colors.theme}
      />
      <View
        style={{
          backgroundColor: Colors.theme,
          paddingBottom: Layout.height * 0.2,
          borderBottomLeftRadius: Layout.width * 0.1,
          borderBottomRightRadius: Layout.width * 0.1,
        }}
      >
        <View
          style={{
            alignItems: 'flex-end',
            paddingHorizontal: 32,
            marginVertical: 20,
          }}
        >
          <Icon name='equalizer' size={20} style={{ color: Colors.white }} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 32,
            marginVertical: -106,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Image
            source={require('../../assets/avatar1.jpg')}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 16,
              marginTop: 120,
            }}
          />
          <View>
            <Text style={{ fontSize: 20, color: Colors.white }}>
              Oscar Ramos Delgadillo
            </Text>
            <Text
              style={{
                color: Colors.grey,
                marginBottom: 30,
                textAlign: 'center',
              }}
            >
              React Developer
            </Text>
          </View>

          <Image
            source={require('../../assets/avatar4.png')}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 16 }}
          />
          <View>
            <Text style={{ fontSize: 20, color: Colors.white }}>
              Florencia Bravo Corvalán
            </Text>
            <Text
              style={{
                color: Colors.grey,
                marginBottom: 30,
                textAlign: 'center',
              }}
            >
              React Developer
            </Text>
          </View>

          <Image
            source={require('../../assets/avatar2.jpg')}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 16 }}
          />
          <View>
            <Text style={{ fontSize: 20, color: Colors.white }}>
              Jorge Daniel Silva
            </Text>
            <Text
              style={{
                color: Colors.grey,
                marginBottom: 30,
                textAlign: 'center',
              }}
            >
              React Developer
            </Text>
          </View>

          <Image
            source={require('../../assets/avatar3.jpg')}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 16 }}
          />
          <View>
            <Text style={{ fontSize: 20, color: Colors.white }}>
              Jorge Díaz
            </Text>
            <Text
              style={{
                color: Colors.grey,
                marginBottom: 30,
                textAlign: 'center',
              }}
            >
              React Developer
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          marginHorizontal: 32,
          padding: 20,
          borderRadius: 20,
          elevation: 8,
          marginBottom: 16,
          marginTop: -Layout.height * 0.05,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}
        >
          <Text>Quiénes Somos</Text>
          <Icon name='pen' />
        </View>
        <View style={{ marginVertical: 8 }}>
          <Text style={{ color: Colors.grey, textAlign: 'justify' }}>
            Somos un equipo de desarrolladores en React que construimos esta
            aplicación del Clima para ayudar a Paula a mejorar sus ventas en el
            negocio de venta de helados. Amamos trabajar en equipo.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
