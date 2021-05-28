import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from "./src/core/theme";
import {Provider as PaperProvider} from "react-native-paper";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './src/store/reducers';
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/RegisterScreen";
import BooksScreen from "./src/screens/BooksScreen";
import BookDetailScreen from "./src/screens/BookDetailScreen";

const Stack = createStackNavigator();
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="BooksScreen" component={BooksScreen} />
            <Stack.Screen name="BookDetailScreen" component={BookDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
