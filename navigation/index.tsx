/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Linking } from 'react-native';
import { View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/modal/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Home from '../screens/home/Home';
import TabTwoScreen from '../screens/home/Home';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerTitle: "Mi Turno TV",
        headerStyle: {
          backgroundColor: 'red',
        },
        headerTitleStyle: {
          color: 'white'
        },
        tabBarStyle: {
          backgroundColor: "#333333",
          padding:10,
        },
      }}>

      <BottomTab.Screen
        name        = "Website"
        component   = {TabTwoScreen}
        options     = {{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name= "globe" color={"skyblue"} onPress = {() => Linking.openURL("https://miturno.com.do/")}  />,
        }}
      />

      <BottomTab.Screen
        name        = "Youtube"
        component   = {TabTwoScreen}
        options     = {{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="youtube-play" color={"#c4302b"} onPress = {() => Linking.openURL("https://www.youtube.com/@miturno/")}  />,
        }}
      />

      <BottomTab.Screen
        name        = "Home"
        component   = {Home}
        options     = {({ navigation }: RootTabScreenProps<'Home'>) => ({
          tabBarStyle: {
            backgroundColor: "#333333",
            color: 'white'
          },
          title: ''
        })}
      />

      <BottomTab.Screen
        name = "Facebook"
        component={TabTwoScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="facebook-square" color={"#3b5998"} onPress = {() => Linking.openURL("https://www.facebook.com/MiTurnotv/")} />,
        }}
      />


      <BottomTab.Screen
        name = "Instagram"
        component={TabTwoScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="instagram" color={"#833AB4"} onPress = {() => Linking.openURL("https://www.instagram.com/miturnotv/")} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

/**
           {/*headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),*}
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  onPress?: () => void
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
