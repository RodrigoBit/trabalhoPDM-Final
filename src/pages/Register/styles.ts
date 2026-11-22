import { StyleSheet } from 'react-native';
import { color } from '../../global/theme';
export const s = StyleSheet.create({
  columns: { gap: 16 }, wide: { flexDirection: 'row' }, half: { flex: 1, minWidth: 0 },
  note: { color: color.muted, fontSize: 13, lineHeight: 19 },
});
