import {
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Modal
} from 'react-native';

import {
  MiTurnoRSS,
  newsItems,
  RootTabScreenProps
} from '../../types';
import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

import * as ScreenOrientation from 'expo-screen-orientation';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import useScreenOrientation from '../../hooks/getSCreenOrientation';
import registerForPushNotificationsAsync from '../../components/registerForPushNotificationsAsync';

import styles from './styles';
import ModalScreen from '../modal/ModalScreen';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale } from '../../components/responsive';

const BACKGROUND_FETCH_TASK = 'background-fetch';
const STREAM_URL            = 'https://udwn.ovh:25463/live/SE91LSXHzc/sKtkdQBoxt/4_.m3u8';

  // 1. Define the task by providing a name and the function that should be executed
  // Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const national = await parse('https://miturno.com.do/category/nacionales/feed/') as MiTurnoRSS;
  const international = await parse('https://miturno.com.do/category/internacionales/feed/') as MiTurnoRSS;
  const politics = await parse('https://miturno.com.do/category/politica/feed/') as MiTurnoRSS;

  const politicsEnabled       = JSON.stringify (map.get ('politics')) !== JSON.stringify (politics);
  const nationalEnabled       = JSON.stringify (map.get ('national')) !== JSON.stringify (national);
  const internationalEnabled  = JSON.stringify (map.get ('international')) !== JSON.stringify (international);

    // show push notifications
  if (politicsEnabled && internationalEnabled && nationalEnabled) schedulePushNotification();

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 3.6e+6, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const { parse }       = require('rss-to-json');
const map             = new Map ();

const Home = () => {
  const videoRef                                      = useRef <Video>  (null);
  const [getFeedNational, setFeedNational]            = useState <MiTurnoRSS> ();
  const [getFeedInternational, setFeedInternational]  = useState <MiTurnoRSS> ();
  const [getFeedPolitics, setFeedPolitics]            = useState <MiTurnoRSS> ();
  const [getFeedSurveys, setFeedSurveys]              = useState <MiTurnoRSS> ();
  const [expoPushToken, setExpoPushToken]             = useState('');
  const [getModalStatus, setModalStatus]              = useState (false);
  const [getModalData, setModalData]                  = useState <newsItems> ();

  const navigation                                    = useNavigation ();
  const orientation                                   = useScreenOrientation ();

  const assign_rss_news_to_states = async () => {
    const national = await parse('https://miturno.com.do/category/nacionales/feed/') as MiTurnoRSS;
    setFeedNational (national);
    map.set ('national', national);

    const international = await parse('https://miturno.com.do/category/internacionales/feed/') as MiTurnoRSS;
    setFeedInternational (international);
    map.set ('international', international);

    const politics = await parse('https://miturno.com.do/category/politica/feed/') as MiTurnoRSS;
    setFeedPolitics (politics);
    map.set ('politics', politics);

    const survey = await parse('https://miturno.com.do/category/encuestas/feed/') as MiTurnoRSS;
    setFeedSurveys (survey);
  };

    // screen orientation
    // locking screen
  const changeScreenOrientation = async (orientation: 'LANDSCAPE' | 'PORTRAIT' | 'DEFAULT') => await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock[orientation]);

    // fetch task
    // registering task
  const fetchTask = async () => await registerBackgroundFetchAsync ();

  useEffect(() => {
    navigation.setOptions ({
      tabBarIcon: ({ }) => <MaterialCommunityIcons
        name    = "home"
        color   = {"skyblue"}
        onPress = {() => setModalStatus (false)}
        size    = {moderateScale (24)}
      />
    })
      // activating background mode
    fetchTask ();

      // Orientation to default
    changeScreenOrientation ('DEFAULT');

      // registering push notifications
    registerForPushNotificationsAsync ().then(token => setExpoPushToken(token!));

    let notificationListener  = Notifications.addNotificationReceivedListener (notification => {});
    let responseListener      = Notifications.addNotificationResponseReceivedListener (response => {});

      // reloading rss news
      // every 120000ms or 2minutes
    let interval = setInterval (assign_rss_news_to_states, 120000);
    assign_rss_news_to_states ();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);

      clearInterval (interval);
    };
  }, []);

  useEffect (() => {
    if (!getModalStatus) {
      if (orientation === 'PORTRAIT') videoRef.current?._setFullscreen (false);
      else videoRef.current?._setFullscreen (true);
    }
  }, [orientation]);

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

    const data = JSON.parse (JSON.stringify (props.item));
    data.thumbnail  = thumbnail!;
    data.content    = content.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");

    return (
      <TouchableOpacity
        style     = {styles.feed}
        onPress   = {() => {
          setModalStatus (true);
          setModalData (data);
        }}
        //onPress   = {() => Linking.openURL (link)}
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
          left: '2.5%',
          borderRadius: 20,
          top: "15%",
          zIndex: 5
        }}>EN VIVO</Text>

        <Video
          style         = {styles.video}
          source        = {{ uri: STREAM_URL }}
          shouldPlay    = {true}
          ref           = {videoRef}
          focusable = {true}
          onFullscreenUpdate = {(evt) => {
            if (evt.fullscreenUpdate === 1) changeScreenOrientation ('LANDSCAPE');
            else changeScreenOrientation ('DEFAULT');
          }}
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
        {
          /*<Text style = {styles.label}>Encuestas</Text>
          <FlatList
            horizontal
            overScrollMode  = {'never'}
            data            = {getFeedSurveys?.items}
            keyExtractor    = {item => item.id}
            renderItem      = {newsItems}
          />*/
        }
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
      {getModalStatus ?
        <ModalScreen
          onPress   = {() => setModalStatus (false)}
          data      = {getModalData!}
        />
      : null}
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "MI TURNO APP",
      body: 'HAY NUEVAS NOTICIAS! 📰',
    },
    trigger: { seconds: 5 },
  });
}


export default Home;