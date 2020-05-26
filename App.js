import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {combineReducers, applyMiddleware, createStore} from 'redux';
import ReactThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {imagesReducer} from './store/reducers/main';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8081 });
const reducers = combineReducers({ images: imagesReducer });
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(ReactThunk))
  );

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);


export default App;
