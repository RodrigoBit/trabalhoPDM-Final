import Feather from '@expo/vector-icons/Feather';
import { Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Panel } from '../../components/Panel';
import { useInventory } from '../../context/InventoryContext';
import { color } from '../../global/theme';
import { money, lowLimit, sku, status } from '../../models/inventory';
import { s } from './styles';

export function Inventory() {
  const { products } = useInventory();
  const stats = [
    ['Produtos', products.length],
    ['Unidades', products.reduce((sum, product) => sum + product.quantity, 0)],
    ['Repor', products.filter(product => product.quantity <= lowLimit).length],
  ] as const;
  return <Screen title="Controle de estoque" summary="Consulte o saldo e a situação de cada produto.">
    <View style={s.stats}>{stats.map(([label, value]) => <View key={label} style={s.stat}><Text style={[s.value, label === 'Repor' && s.accent]}>{value}</Text><Text style={s.label}>{label}</Text></View>)}</View>
    <Panel title="Produtos em estoque" icon="layers"><View style={s.list}>{products.map(product => {
      const state = status(product.quantity);
      const low = state === 'Baixo';
      const empty = state === 'Esgotado';
      return <View key={product.id} style={s.row}>
        <View style={s.left}><Text style={s.name}>{product.name}</Text><Text style={s.detail}>{sku(product.id)} · {money(product.priceCents)}</Text></View>
        <View style={s.right}><Text style={s.unit}>{product.quantity} un.</Text>
          <View style={[s.badge, low && s.badgeLow, empty && s.badgeEmpty]}>
            <Feather name={empty ? 'minus-circle' : low ? 'alert-triangle' : 'check-circle'} size={12} color={empty ? color.danger : low ? color.amber : color.green} />
            <Text style={[s.badgeText, low && s.lowText, empty && s.emptyText]}>{state}</Text>
          </View></View>
      </View>;
    })}</View><Text style={s.note}>Reposição indicada para produtos com até {lowLimit} unidades.</Text></Panel>
  </Screen>;
}
