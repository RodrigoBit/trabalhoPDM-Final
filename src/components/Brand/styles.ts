import { StyleSheet } from 'react-native';
import { color, mono } from '../../global/theme';

export const s = StyleSheet.create({
  bar: { backgroundColor: color.paper, borderBottomColor: color.line, borderBottomWidth: 1 },
  inner: { width: '100%', maxWidth: 1192, minHeight: 76, paddingHorizontal: 24, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mark: { width: 37, height: 37, backgroundColor: color.green, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 29, fontWeight: '800', letterSpacing: -1.8, color: color.ink },
  detail: { fontFamily: mono, fontSize: 12, color: color.muted },
  exit: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10 },
});
