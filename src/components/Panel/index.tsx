import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps, PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { color } from '../../global/theme';
import { s } from './styles';
interface Props extends PropsWithChildren { title: string; icon: ComponentProps<typeof Feather>['name'] }
export function Panel({ title, icon, children }: Props) {
  return <View style={s.panel}><View style={s.heading}><Feather name={icon} size={20} color={color.green} /><Text style={s.title}>{title}</Text></View>{children}</View>;
}
