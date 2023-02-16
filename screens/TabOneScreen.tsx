import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Image} from 'react-native';
import { RootTabScreenProps } from '../types';
import { Video, AVPlaybackStatus } from 'expo-av';
import {useRef,useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
 
      <LinearGradient
        start   = {{ x: 0, y: 1 }}
        end     = {{ x: 1, y: 0 }}
        colors  = {['purple', 'red']}
        style   = {styles.video_container}
      >
          <Text style={styles.title}>En vivo</Text>
          <Video
            style   = {styles.video}
            source  = {{ uri: 'http://ud-streamings.udwn.net:1935/live/domingourena/playlist.m3u8' }}

              // @ts-ignore
            resizeMode="cover"
            shouldPlay = {true}
          />
      </LinearGradient>
      <View style = {styles.news}>
        <Text style = {styles.label}>Noticias</Text>
        <Text style = {{
          ...styles.label,
          fontSize: 15,
          }}>Nacionales</Text>

          <View style = {styles.feed}>
            <Image
              style = {styles.img}
              source={{uri: 'https://miturno.com.do/wp-content/uploads/2023/02/B7296677-740D-4A03-9A25-E516BDBCED94-696x462.jpeg'}}
            />
            <View style = {{
              width: '55%',
              marginLeft: 10
            }}>
              <Text style = {styles.feed_label}>
                Avicultores logran récord de producción de 19.6 millones de unidades en enero del 2023
              </Text>
              <Text style = {{
                ...styles.feed_label,
                fontSize: 15,
                color:'gray'
              }}>
                La Asociación Dominicana de Avicultura (ADA) anunció que durante enero pasado, la producción nacional de pollos alcanzó los 19.6 millones... <Text style = {{
                  color: 'blue'
                }}>Leer mas</Text>
              </Text>
            </View>
          </View>
          <View style = {styles.feed}>
            <Image
              style = {styles.img}
              source={{uri: 'https://miturno.com.do/wp-content/uploads/2023/02/5040D8E9-4B5E-401F-A224-286E936B0145.jpeg'}}
            />
            <View style = {{
              width: '55%',
              marginLeft: 10
            }}>
              <Text style = {styles.feed_label}>
                Muere fundador del Grupo Vimenca, Víctor Méndez Capellán
              </Text>
              <Text style = {{
                ...styles.feed_label,
                fontSize: 15,
                color:'gray'
              }}>
                Este martes falleció el empresario dominicano Víctor Méndez Capellán.... <Text style = {{
                  color: 'blue'
                }}>Leer mas</Text>
              </Text>
            </View>
          </View>
          <View style = {styles.feed}>
            <Image
              style = {styles.img}
              source={{uri: 'https://miturno.com.do/wp-content/uploads/2023/02/imagen_2023-02-13_150926059-696x325.jpg'}}
            />
            <View style = {{
              width: '55%',
              marginLeft: 10
            }}>
              <Text style = {styles.feed_label}>
                Edenorte deja inaugurado proyecto en Bonao, con la presencia del Presidente Luis Abinader
              </Text>
              <Text style = {{
                ...styles.feed_label,
                fontSize: 15,
                color:'gray'
              }}>
                El Presidente Luis Abinader dejo inaugurada el proyecto eléctrico Los Quemados en la provincia monseñor Noel, obra realizada por Edenorte Dominicana S.A. por un valor de RD$ 580 millones.... <Text style = {{
                  color: 'blue'
                }}>Leer mas</Text>
              </Text>
            </View>
          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#424549'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  video: {
    width: "90%",
    height: '70%',
    borderRadius: 25,
  },
  video_container: {
    flex: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
  },
  news: {
    flex: 5,
    width: '95%',
  },
  label: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  feed: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row'
  },
  img: {
    borderRadius: 10,
    width: 150,
    height: 150
  },
  feed_label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});
