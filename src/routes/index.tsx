import Feather from '@expo/vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brand } from '../components/Brand';
import { useAuth } from '../context/AuthContext';
import { color } from '../global/theme';
import { Login } from '../pages/Login';
import { Inventory } from '../pages/Inventory';
import { Register } from '../pages/Register';
import { Withdrawal } from '../pages/Withdrawal';
import type { RootNavigation, RootParams, TabParams } from './types';
import { s } from './styles';
const Stack = createNativeStackNavigator<RootParams>();
const Tab = createBottomTabNavigator<TabParams>();
const icons: Record<keyof TabParams, ComponentProps<typeof Feather>['name']> = {
  Cadastro: 'plus-square', Estoque: 'layers', Saída: 'arrow-up-right',
};

function BottomRoutes() {
  const { signedIn, logout } = useAuth();
  const navigation = useNavigation<RootNavigation>();
  if (!signedIn) return <Login />;
  function exit() {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }
  return <View style={s.logged}><Brand onExit={exit} />
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false, tabBarStyle: s.tabs, tabBarItemStyle: s.item, tabBarLabelStyle: s.label,
      tabBarActiveTintColor: color.green, tabBarInactiveTintColor: color.muted, tabBarActiveBackgroundColor: color.pale,
      tabBarLabelPosition: 'below-icon', sceneStyle: s.scene, tabBarHideOnKeyboard: true,
      tabBarIcon: ({ color: tint, size }) => <Feather name={icons[route.name]} size={Math.min(size, 21)} color={tint} />,
    })}>
      <Tab.Screen name="Cadastro" component={Register} />
      <Tab.Screen name="Estoque" component={Inventory} />
      <Tab.Screen name="Saída" component={Withdrawal} />
    </Tab.Navigator></View>;
}
export function Routes() {
  return <SafeAreaView style={s.safe} edges={['top', 'left', 'right']}><NavigationContainer><Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
    <Stack.Screen name="Login" component={Login} /><Stack.Screen name="BottomRoutes" component={BottomRoutes} />
  </Stack.Navigator></NavigationContainer></SafeAreaView>;
}
