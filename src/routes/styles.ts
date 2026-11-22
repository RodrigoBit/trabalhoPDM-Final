import { StyleSheet } from 'react-native';
import { color } from '../global/theme';
export const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: color.paper }, logged: { flex: 1, backgroundColor: color.paper },
  tabs: { backgroundColor: color.white, minHeight: 64, borderTopColor: color.line },
  item: { borderRadius: 9, marginHorizontal: 3 },
  label: { fontWeight: '700', fontSize: 12, lineHeight: 16, flexShrink: 0 }, scene: { backgroundColor: color.paper },
});
