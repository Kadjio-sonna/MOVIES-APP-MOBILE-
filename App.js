import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
//import Search from './Components/Search'

export default function App() {
  return (
      <Provider store={Store} >
        <Navigation/>
      </Provider>

  /* <Search/>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!</Text>
      <StatusBar style="auto" />
    </View>
   */
  );
}

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },*/
});
