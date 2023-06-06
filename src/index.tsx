import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import './libs/dayjs';
import dayjs from 'dayjs';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import { NativeBaseProvider, Box } from 'native-base';
import { Horse, Heart, Cube } from 'phosphor-react-native';

import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

import { StyleSheet, Text, View, StatusBar } from 'react-native';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        products {
          data {
            id
            attributes {
              title
              description
            }
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const date = dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Box>
            <Text>Headphones store!</Text>
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 40 }}>Inter Black</Text>

            <Text>{date}</Text>

            <View>
              <Horse />
              <Heart color="#AE2983" weight="fill" size={32} />
              <Cube color="teal" weight="duotone" />
            </View>
          </Box>
          <StatusBar barStyle="dark-content" />
        </View>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
