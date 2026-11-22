import { useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { Screen } from '../../components/Screen';
import { Panel } from '../../components/Panel';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';
import { Notice, type Message } from '../../components/Notice';
import { useInventory } from '../../context/InventoryContext';
import { isWide } from '../../global/theme';
import { readPrice, readQuantity, sku } from '../../models/inventory';
import { s } from './styles';

export function Register() {
  const { add } = useInventory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState<Message>();
  const wide = isWide(useWindowDimensions().width);
  function submit() {
    const cents = readPrice(price);
    const units = readQuantity(quantity);
    if (!name.trim()) return setMessage({ error: true, text: 'Informe o nome do produto.' });
    if (cents === undefined) return setMessage({ error: true, text: 'Informe um preço positivo com até duas casas decimais.' });
    if (units === undefined) return setMessage({ error: true, text: 'Informe uma quantidade inteira igual ou superior a zero.' });
    const product = add(name, cents, units);
    setMessage({ text: sku(product.id) + ' · ' + product.name + ' cadastrado com ' + units + ' un.' });
    setName(''); setPrice(''); setQuantity('');
  }
  return <Screen title="Cadastro de produtos" summary="Adicione um item ao catálogo e informe o saldo inicial.">
    <Panel title="Dados do produto" icon="package">
      <Field label="Nome do produto" icon="tag" value={name} onChangeText={setName} placeholder="Ex.: Caixa de papelão" maxLength={100} />
      <View style={[s.columns, wide && s.wide]}>
        <View style={s.half}><Field label="Preço unitário (R$)" value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="0,00" /></View>
        <View style={s.half}><Field label="Quantidade inicial" value={quantity} onChangeText={setQuantity} keyboardType="number-pad" placeholder="0" /></View>
      </View>
      <Text style={s.note}>O código do produto é gerado no cadastro.</Text>
      {message && <Notice {...message} />}
      <Button title="Cadastrar produto" onPress={submit} icon="plus" />
    </Panel>
  </Screen>;
}
