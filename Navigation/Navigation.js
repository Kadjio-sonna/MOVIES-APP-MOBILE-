
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'


const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Rechercher" component={Search} />
         <Stack.Screen name="FilmDetail" component={FilmDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation



/*
import { createStackNavigator } from 'react-navigation'
import Search from '../Components/Search'
const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    }
})

export default SearchStackNavigator*/
