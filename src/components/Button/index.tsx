import Feather from '@expo/vector-icons/Feather';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import type { ComponentProps } from 'react';
import { color } from '../../global/theme';
import { s } from './styles';
interface Props { title: string; onPress: () => void; icon: ComponentProps<typeof Feather>['name']; busy?: boolean }
export function Button({ title, onPress, icon, busy }: Props) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ busy, disabled: busy }} disabled={busy} onPress={onPress}
    style={({ pressed }) => [s.button, (pressed || busy) && s.pressed]}>
    <Text style={s.text}>{title}</Text>{busy ? <ActivityIndicator color={color.orange} /> : <Feather name={icon} size={18} color={color.orange} />}
  </Pressable>;
}
