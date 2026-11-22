import Feather from '@expo/vector-icons/Feather';
import { Pressable, Text, View } from 'react-native';
import { color } from '../../global/theme';
import { s } from './styles';

export function Brand({ onExit }: { onExit?: () => void }) {
  return <View style={s.bar}><View style={s.inner}>
    <View style={s.brand}><View style={s.mark}><Feather name="box" size={23} color={color.orange} /></View><Text style={s.name}>Almox.</Text></View>
    {onExit ? <Pressable accessibilityRole="button" accessibilityLabel="Sair" onPress={onExit} style={s.exit}><Feather name="log-out" size={17} color={color.muted} /><Text style={s.detail}>Sair</Text></Pressable>
      : <Text style={s.detail}>Sistema de estoque</Text>}
  </View></View>;
}
