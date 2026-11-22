import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Panel } from '../../components/Panel';
import { Screen } from '../../components/Screen';
import { Notice, type Message } from '../../components/Notice';
import { useInventory } from '../../context/InventoryContext';
import { color } from '../../global/theme';
import { readQuantity, searchKey, sku } from '../../models/inventory';
import { s } from './styles';

export function Withdrawal() {
  const { products, withdraw } = useInventory();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState<Message>();
  const filtered = products.filter(p => searchKey(p.name + ' ' + sku(p.id)).includes(searchKey(query)));
  const selected = products.find(p => p.id === selectedId);
  function search(value: string) {
    setQuery(value); setSelectedId(undefined); setQuantity(''); setMessage(undefined); setOpen(true);
  }
  function choose(id: number) {
    setSelectedId(id); setOpen(false); setQuantity(''); setMessage(undefined);
  }
  function submit() {
    if (!selected) return setMessage({ error: true, text: 'Selecione um produto para registrar a saída.' });
    const units = readQuantity(quantity);
    if (!units) return setMessage({ error: true, text: 'Informe uma quantidade inteira maior que zero.' });
    const receipt = withdraw(selected.id, units);
    if (!receipt) return setMessage({ error: true, text: 'Saldo insuficiente. Disponível: ' + selected.quantity + ' un.' });
    setMessage({ text: 'Baixa registrada · ' + selected.name + ': ' + receipt.quantity + ' un. retiradas. Saldo: ' + receipt.balance + ' un.' });
    setQuantity('');
    setOpen(false);
  }
  return <Screen title="Saída de produtos" summary="Selecione o material e registre a quantidade retirada.">
    <Panel title="Registrar baixa" icon="archive">
      <Field label="Buscar produto" icon="search" value={query} onChangeText={search} placeholder="Busque por nome ou código" />
      <View style={s.group}><Text style={s.label}>Produto para saída</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Selecionar produto" accessibilityState={{ expanded: open }} onPress={() => setOpen(!open)} style={s.picker}>
          <Text style={[s.selection, !selected && s.muted]}>{selected ? selected.name : 'Selecione um produto'}</Text>
          <Feather name={open ? 'chevron-up' : 'chevron-down'} size={18} color={color.muted} />
        </Pressable>
        {open && <View style={s.options}>{filtered.length ? filtered.map(p =>
          <Pressable accessibilityRole="button" key={p.id} accessibilityLabel={p.name + ', ' + sku(p.id)} onPress={() => choose(p.id)} style={[s.option, selectedId === p.id && s.chosen]}>
            <Text style={s.selection}>{p.name}</Text><Text style={s.info}>{sku(p.id)} · {p.quantity} un.</Text>
          </Pressable>) : <Text style={s.option}>Nenhum produto encontrado.</Text>}</View>}
        {selected && <Text style={s.info}>{sku(selected.id)} · Saldo disponível: {selected.quantity} un.</Text>}
      </View>
      <Field label="Quantidade de saída" keyboardType="number-pad" value={quantity} onChangeText={setQuantity} placeholder="0" onSubmitEditing={submit} />
      {message && <Notice {...message} />}
      <Button title="Registrar saída" onPress={submit} icon="arrow-up-right" />
    </Panel>
  </Screen>;
}
