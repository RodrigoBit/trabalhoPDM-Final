import Feather from '@expo/vector-icons/Feather';
import { useState, type ComponentProps } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { color } from '../../global/theme';
import { s } from './styles';
interface Props extends Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'keyboardType' | 'autoCapitalize' | 'autoComplete' | 'onSubmitEditing' | 'editable' | 'maxLength' | 'returnKeyType'> {
  label: string;
  icon?: ComponentProps<typeof Feather>['name'];
  password?: boolean;
}
export function Field({ label, icon, password, ...input }: Props) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  return <View style={s.group}><Text style={s.label}>{label}</Text>
    <View style={[s.box, focused && s.active]}>
      {icon && <Feather name={icon} size={17} color={color.muted} />}
      <TextInput {...input} accessibilityLabel={label} placeholderTextColor={color.muted} secureTextEntry={password && !visible}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={s.input} />
      {password && <Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'} style={s.toggle} onPress={() => setVisible(!visible)}>
        <Feather name={visible ? 'eye-off' : 'eye'} size={18} color={color.muted} />
      </Pressable>}
    </View></View>;
}
