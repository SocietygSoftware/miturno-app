import { FlatList, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Image, Dimensions} from 'react-native';
import { MiTurnoRSS, newsItems, RootTabScreenProps } from '../types';
import { Video, AVPlaybackStatus } from 'expo-av';
import {useEffect, useRef,useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale } from '../components/responsive';
const { parse } = require('rss-to-json');
const {width,height} = Dimensions.get ('screen')

const Home = ({ navigation }: RootTabScreenProps<'Home'>) => {
  const [getFeedNational, setFeedNational]            = useState <MiTurnoRSS> ();
  const [getFeedInternational, setFeedInternational]  = useState <MiTurnoRSS> ();
  const [getFeedPolitics, setFeedPolitics]            = useState <MiTurnoRSS> ();
  const [getFeedSurveys, setFeedSurveys]              = useState <MiTurnoRSS> ();

  useEffect (() => {
    (async () => {
      const national = await parse('https://miturno.com.do/category/nacionales/feed/') as MiTurnoRSS;
      setFeedNational (national);

      const international = await parse('https://miturno.com.do/category/internacionales/feed/') as MiTurnoRSS;
      setFeedInternational (international);

      const politics = await parse('https://miturno.com.do/category/politica/feed/') as MiTurnoRSS;
      setFeedPolitics (politics);

      const survey = await parse('https://miturno.com.do/category/encuestas/feed/') as MiTurnoRSS;
      setFeedSurveys (survey);
    })();
  },[])

  const newsItems = (props: {
    index: number,
    item: newsItems
  }) => {
    const {
      title,
      content,
      link
    } = props.item;

      // getting the thumbnails from the content
    let thumbnail = getFeedNational?.image;
    const getThumbnail = content.split (" ");

    getThumbnail.forEach (string => {
       if (string.includes ('src')) thumbnail =  (string.replace(`srcset="`, "").replace (`"`, ''))
    });

    return (
      <TouchableOpacity
        style     = {styles.feed}
        onPress   = {() => Linking.openURL (link)}
      >
        <Image
          style   = {styles.img}
          source  = {{uri: thumbnail}}
        />
          <View style = {{
              flex: 1
          }}>
            <View style={styles.labelWrapper}>
              <Text style = {styles.feed_title}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        start   = {{ x: 0, y: 1 }}
        end     = {{ x: 1, y: 0 }}
        colors  = {['purple', 'red']}
        style   = {styles.video_container}
      >
        <Text style={{
          ...styles.title,
          position: "absolute",
          color: 'white',
          backgroundColor: "#333333",
          padding: 5,
          borderRadius: 20,
          top: "20%",
          zIndex: 5
        }}>EN VIVO</Text>
        <Video
          style         = {styles.video}
          source        = {{ uri: 'http://ud-streamings.udwn.net:1935/live/domingourena/playlist.m3u8' }}
          shouldPlay    = {false}
          useNativeControls = {true}
                // @ts-ignore
          resizeMode    = {"cover"}
        />
      </LinearGradient>

      <Text style = {{
        ...styles.label,
        marginTop: 10,
        textDecorationLine: 'none'
      }}>Ultimas publicaciones</Text>
      <ScrollView
        overScrollMode = {'never'}
      >
        {/*<Text style = {styles.label}>Encuestas</Text>
        <FlatList
          horizontal
          overScrollMode  = {'never'}
          data            = {getFeedSurveys?.items}
          keyExtractor    = {item => item.id}
          renderItem      = {newsItems}
        />*/}
        <Text style       = {styles.label}>Nacionales</Text>
        <FlatList
          horizontal
          overScrollMode  = {'never'}
          data            = {getFeedNational?.items}
          keyExtractor    = {item => item.id}
          renderItem      = {newsItems}
        />
        <Text style     = {styles.label}>Internacionales</Text>
        <FlatList
          horizontal
          overScrollMode  = {'never'}
          data            = {getFeedInternational?.items}
          keyExtractor    = {item => item.id}
          renderItem      = {newsItems}
        />
        <Text style     = {styles.label}>Politicas</Text>
        <FlatList
          horizontal
          overScrollMode  = {'never'}
          data            = {getFeedPolitics?.items}
          keyExtractor    = {item => item.id}
          renderItem      = {newsItems}
        />
      </ScrollView>
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
    fontSize: moderateScale (20),
    fontWeight: 'bold',
  },
  video: {
    position: 'absolute',
   // aspectRatio: 1,
    height: "70%",
    width: "95%",
    borderRadius: 15,
    bottom:"5%"
  },
  video_container: {
    height: '45%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
  },
  label: {
    fontSize: moderateScale (14),
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
    textDecorationLine: 'underline'
  },
  feed: {
    marginLeft: 15,
  },
  img: {
    borderRadius: 10,
    width: moderateScale (130),
    height: moderateScale (120),
  },
  feed_title: {
    fontSize: moderateScale (12),
    fontWeight: 'bold',
    color: 'white',
    width:0,
    flexGrow: 1,
    flex: 1,
  },
  labelWrapper:{
    flexDirection: 'row',
  }
});


export default Home;