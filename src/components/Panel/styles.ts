import { StyleSheet } from 'react-native';
import { color } from '../../global/theme';
export const s = StyleSheet.create({
  panel: { gap: 19, padding: 22, borderRadius: 14, borderWidth: 1, borderColor: color.line, backgroundColor: color.white },
  heading: { flexDirection: 'row', gap: 10, alignItems: 'center' }, title: { fontWeight: '700', fontSize: 19, letterSpacing: -0.55, color: color.ink },
});
