import { registerRootComponent } from 'expo';

// SWITCH:
// 'false' -> pure React Navigation (via App.js)
// 'true'  -> Expo Router (via the app/ folder)
const USE_EXPO_ROUTER = true;

if (USE_EXPO_ROUTER) {
  const { App } = require('expo-router/build/qualified-entry');
  registerRootComponent(App);
} else {
  const App = require('./App').default;
  registerRootComponent(App);
}
