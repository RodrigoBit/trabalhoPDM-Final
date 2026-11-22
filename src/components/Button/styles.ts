import { StyleSheet } from 'react-native';
import { color } from '../../global/theme';
export const s = StyleSheet.create({
  button: { backgroundColor: color.green, borderRadius: 8, minHeight: 50, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 12 },
  pressed: { opacity: 0.82 },
  text: { fontSize: 15, fontWeight: '700', color: color.white },
});
