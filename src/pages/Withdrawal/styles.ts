import { StyleSheet } from 'react-native';
import { color } from '../../global/theme';
export const s = StyleSheet.create({
  group: { gap: 8 }, label: { fontSize: 14, fontWeight: '600', color: color.ink },
  picker: { minHeight: 50, paddingHorizontal: 14, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', gap: 8, borderColor: color.line, borderWidth: 1, borderRadius: 8 },
  selection: { flex: 1, fontSize: 15, color: color.ink }, muted: { color: color.muted },
  options: { borderColor: color.line, borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  option: { padding: 13, flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center' },
  chosen: { backgroundColor: color.pale }, info: { fontSize: 13, color: color.muted },
});
