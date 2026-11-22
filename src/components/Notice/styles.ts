import { StyleSheet } from 'react-native';
import { color } from '../../global/theme';
export const s = StyleSheet.create({
  box: { padding: 13, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: color.pale },
  error: { backgroundColor: color.blush }, text: { flex: 1, fontSize: 14, lineHeight: 20, color: color.green }, errorText: { color: color.danger },
});
