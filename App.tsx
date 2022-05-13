import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {Navigator} from './src/navigations/Navigator';
import {Provider as PaperProvider} from 'react-native-paper';
import Home from './src/screens/Home/Home';

const App = () => {
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
};

export default App;
