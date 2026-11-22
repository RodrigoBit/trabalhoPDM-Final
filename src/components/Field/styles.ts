import { StyleSheet } from 'react-native';
import { color } from '../../global/theme';
export const s = StyleSheet.create({
  group: { gap: 8 },
  label: { color: color.ink, fontWeight: '600', fontSize: 14 },
  box: { minHeight: 50, borderRadius: 8, backgroundColor: color.white, borderWidth: 1, borderColor: color.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, gap: 10 },
  active: { borderColor: color.green },
  input: { color: color.ink, fontSize: 16, flex: 1, minWidth: 0, paddingVertical: 12 },
  toggle: { padding: 5 },
});
