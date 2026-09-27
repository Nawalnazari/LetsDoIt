import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { apolloClient } from './src/apollo/client';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750A4',
    primaryContainer: '#EADDFF',
    secondary: '#625B71',
  },
};

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <StatusBar style="auto" />
            <RootNavigator />
          </PaperProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
