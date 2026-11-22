import { Platform } from 'react-native';

export const color = {
  paper: '#F7F6F0', white: '#FFFFFF', ink: '#182B25', green: '#113D33',
  muted: '#53665D', line: '#D4D9CF', pale: '#E8EEE5', orange: '#FFAA5C',
  warm: '#FFF0DB', amber: '#855016', danger: '#913A36', blush: '#FBEAE5',
};
export const mono = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });
export const isWide = (width: number) => width >= 800;
