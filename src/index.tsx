import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

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

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <ApolloProvider client={client}>
            <StatusBar barStyle="dark-content" />
            <Routes />
          </ApolloProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
