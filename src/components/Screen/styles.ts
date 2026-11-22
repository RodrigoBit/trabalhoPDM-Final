import { StyleSheet } from 'react-native';
import { color, mono } from '../../global/theme';
export const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: color.paper },
  body: { width: '100%', maxWidth: 946, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 28, paddingBottom: 40, gap: 24 },
  head: { gap: 6 }, section: { fontFamily: mono, fontSize: 11, fontWeight: '700', letterSpacing: 1.4, color: color.muted },
  title: { fontSize: 36, fontWeight: '800', letterSpacing: -1.8, color: color.ink },
  summary: { color: color.muted, fontSize: 15, lineHeight: 22 },
});
