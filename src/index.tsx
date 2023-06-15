import React from 'react';
import { StatusBar } from 'react-native';

import './libs/dayjs';

import { NativeBaseProvider } from 'native-base';

import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { Routes } from './routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <ApolloProvider client={client}>
        <StatusBar barStyle="dark-content" />
        <Routes />
      </ApolloProvider>
    </NativeBaseProvider>
  );
}
