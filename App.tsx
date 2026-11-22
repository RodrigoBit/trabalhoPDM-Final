import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { InventoryProvider } from './src/context/InventoryContext';
import { Routes } from './src/routes';

export default function App() {
  return <SafeAreaProvider><AuthProvider><InventoryProvider><StatusBar style="dark" /><Routes /></InventoryProvider></AuthProvider></SafeAreaProvider>;
}
