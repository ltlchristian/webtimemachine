import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import HomePage from './pages/HomePage';
import PreviewPage from './pages/PreviewPage';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="yellow"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="search-web" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Preview"
        component={PreviewPage}
        options={{
          tabBarLabel: 'Preview',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="preview" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MenuTabIcons({ route }) {
  console.log(route);
  return (
      <MyTabs />
  );
}
