import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SubscriptionProvider } from './context/SubscriptionContext';

// Screens
import PaywallScreen from './screens/PaywallScreen';
import MeditationsScreen from './screens/MeditationsScreen';
import AIMoodScreen from './screens/AIMoodScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SubscriptionProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Paywall"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#1F1F1F' },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="Paywall" component={PaywallScreen} />
          <Stack.Screen name="Meditations" component={MeditationsScreen} />
          <Stack.Screen name="AIMood" component={AIMoodScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SubscriptionProvider>
  );
}
