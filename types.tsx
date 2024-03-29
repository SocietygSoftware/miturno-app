/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Facebook: undefined;
  Instagram: undefined;
  Website: undefined;
  Youtube: undefined;
  Home: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;


export type newsItems =    {
  id: string,
  title: string,
  description: string,
  link: string,
  author: string,
  published: string;
  created: string;
  category: string;
  content: string;
  enclosures: [];
  content_encoded: string;
  media: {};
  thumbnail: string;
}

export type MiTurnoRSS = {
  title: string;
  description: string;
  link: string;
  image: string;
  category: [];
  items: newsItems []
}