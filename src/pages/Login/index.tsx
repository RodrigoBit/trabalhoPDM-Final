import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Brand } from '../../components/Brand';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Notice } from '../../components/Notice';
import { demoLogin, useAuth } from '../../context/AuthContext';
import { isWide } from '../../global/theme';
import type { RootNavigation } from '../../routes/types';
import { s } from './styles';

export function Login() {
  const wide = isWide(useWindowDimensions().width);
  const navigation = useNavigation<RootNavigation>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit() {
    if (busy) return;
    if (!email.trim() || !password) { setError('Informe o e-mail e a senha para entrar.'); return; }
    setBusy(true);
    setError('');
    if (await login(email, password)) {
      navigation.reset({ index: 0, routes: [{ name: 'BottomRoutes' }] });
    } else {
      setError('E-mail ou senha incorretos.');
      setBusy(false);
    }
  }
  function fill() {
    setEmail(demoLogin.email);
    setPassword(demoLogin.password);
    setError('');
  }
  return <View style={s.root}><Brand /><ScrollView style={s.scroll} keyboardShouldPersistTaps="handled" contentContainerStyle={[s.center, wide && s.spacious]}>
    <View style={[s.card, wide && s.split]}>
      <View style={[s.cover, wide && s.coverWide]}>
        <View style={s.heroText}><View style={s.line} /><Text style={[s.heroTitle, wide && s.largeTitle]}>{'Controle de\nestoque.'}</Text></View>
        <Image accessible={false} source={require('../../../assets/pallet.jpg')} resizeMode="contain" style={wide ? s.art : s.smallArt} />
        {wide && <Text style={s.caption}>Cadastre materiais, acompanhe saldos e registre as saídas do almoxarifado.</Text>}
      </View>
      <View style={[s.body, wide && s.bodyWide]}>
        <View style={s.heading}><Text style={s.kicker}>ÁREA DO OPERADOR</Text><Text accessibilityRole="header" style={s.title}>Acessar painel</Text></View>
        <View style={s.form}>
          <Field label="E-mail" icon="mail" value={email} onChangeText={setEmail} placeholder="seu@email.com" editable={!busy} autoCapitalize="none" autoComplete="email" keyboardType="email-address" />
          <Field label="Senha" icon="lock" value={password} onChangeText={setPassword} placeholder="Digite sua senha" password editable={!busy} autoComplete="current-password" onSubmitEditing={submit} />
          {error ? <Notice text={error} error /> : null}
          <Button title={busy ? 'Entrando…' : 'Entrar no sistema'} icon="arrow-right" busy={busy} onPress={submit} />
        </View>
        <View style={s.demo}><View style={s.demoHead}><Text style={s.demoTitle}>ACESSO DE TESTE</Text><Pressable accessibilityRole="button" disabled={busy} onPress={fill}><Text style={s.fill}>Preencher</Text></Pressable></View>
          <Text selectable style={s.credentials}>{demoLogin.email} · {demoLogin.password}</Text>
        </View>
      </View>
    </View>
  </ScrollView></View>;
}
