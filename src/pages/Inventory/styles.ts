import { StyleSheet } from 'react-native';
import { color, mono } from '../../global/theme';
export const s = StyleSheet.create({
  stats: { flexDirection: 'row', gap: 8 }, stat: { flex: 1, backgroundColor: color.green, borderRadius: 12, padding: 13, gap: 7 },
  value: { fontSize: 27, color: color.white, fontWeight: '700', letterSpacing: -1 }, label: { fontSize: 12, color: '#DFE7DE' },
  accent: { color: color.orange }, list: { gap: 2 },
  row: { borderTopWidth: 1, borderColor: color.line, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  left: { flex: 1, gap: 5 }, right: { alignItems: 'flex-end', gap: 5 },
  name: { fontSize: 16, color: color.ink, fontWeight: '600' }, detail: { fontFamily: mono, fontSize: 12, color: color.muted },
  unit: { fontSize: 15, fontWeight: '700', color: color.ink },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 5, paddingVertical: 3, paddingHorizontal: 7, backgroundColor: color.pale },
  badgeLow: { backgroundColor: color.warm }, badgeEmpty: { backgroundColor: color.blush }, badgeText: { fontSize: 12, fontWeight: '600', color: color.green },
  lowText: { color: color.amber }, emptyText: { color: color.danger }, note: { fontSize: 13, lineHeight: 19, color: color.muted },
});
