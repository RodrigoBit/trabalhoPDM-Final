import type { PropsWithChildren } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { s } from './styles';
export function Screen({ title, summary, children }: PropsWithChildren<{ title: string; summary: string }>) {
  return <ScrollView style={s.scroll} keyboardShouldPersistTaps="handled" contentContainerStyle={s.body}>
    <View style={s.head}><Text style={s.section}>ALMOXARIFADO</Text><Text accessibilityRole="header" style={s.title}>{title}</Text><Text style={s.summary}>{summary}</Text></View>
    {children}
  </ScrollView>;
}
