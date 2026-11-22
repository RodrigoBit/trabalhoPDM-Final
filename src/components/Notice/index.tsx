import Feather from '@expo/vector-icons/Feather';
import { Text, View } from 'react-native';
import { color } from '../../global/theme';
import { s } from './styles';
export interface Message { text: string; error?: boolean }
export function Notice({ text, error }: Message) {
  return <View accessibilityLiveRegion="polite" style={[s.box, error && s.error]}><Feather name={error ? 'alert-circle' : 'check-circle'} size={17} color={error ? color.danger : color.green} /><Text style={[s.text, error && s.errorText]}>{text}</Text></View>;
}
