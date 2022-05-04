import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuTabIcons from './MenuTabIcons';
import LoginPage from './pages/LoginPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Menu" component={MenuTabIcons} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
