import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Home } from './src/screens/home';
import { DetailsScreen } from './src/screens/details';
import { ListStore } from './src/store/listStore';

const Tab = createMaterialTopTabNavigator();

function App() {
  // const store = new ListStore();

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="О приложении" component={Home} />
        <Tab.Screen name="Котировки" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
