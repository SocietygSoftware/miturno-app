import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';

import styles from './styles';
import { newsItems } from '../../types';

type Props = {
  onPress: () => void,
  data: newsItems
}

export default function ModalScreen(props: Props) {
  const {
    onPress,
    data
  } = props;

  const topic_published_date = new Date (data.published).toLocaleDateString ()

  return (
    <View style={styles.container}>
        <View style = {{
          flexDirection: 'row',
          justifyContent:'space-between',
          alignItems: 'center',
        }}>
          <Image
            style   = {styles.image}
            source  = {{ uri: data.thumbnail }}
          />

          <View style = {styles.titleContainer}>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>

      <View style = {styles.authorContainer}>
        <Text style={styles.author}>Publicado por
          <Text style = {{
            fontWeight: 'bold'
          }}> {data.author} - </Text>
          {topic_published_date}
        </Text>
      </View>

      <ScrollView contentContainerStyle = {styles.scrollView}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.content}>
          <Text style={styles.content}>{data.content}</Text>
        </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </ScrollView>
    </View>
  );
}
