import { createContext, useContext, useRef, useState, type PropsWithChildren } from 'react';
import { Platform } from 'react-native';
import { demoStock, type Product, type Withdrawal } from '../models/inventory';

const storageKey = 'almox.products.v1';

function validProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Partial<Product>;
  return typeof entry.name === 'string' && !!entry.name.trim()
    && Number.isSafeInteger(entry.id) && Number(entry.id) > 0
    && Number.isSafeInteger(entry.priceCents) && Number(entry.priceCents) > 0
    && Number.isSafeInteger(entry.quantity) && Number(entry.quantity) >= 0;
}

function loadStock(): Product[] {
  if (Platform.OS === 'web') {
    try {
      const data: unknown = JSON.parse(globalThis.localStorage.getItem(storageKey) ?? 'null');
      if (Array.isArray(data) && data.every(validProduct) && new Set(data.map(p => p.id)).size === data.length) return data;
    } catch { /* O navegador pode desativar o armazenamento local. */ }
  }
  return demoStock;
}

interface InventoryState {
  products: Product[];
  add: (name: string, priceCents: number, quantity: number) => Product;
  withdraw: (id: number, quantity: number) => Withdrawal | undefined;
}
const InventoryContext = createContext<InventoryState | null>(null);

export function InventoryProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>(loadStock);
  const current = useRef(products);

  function update(next: Product[]) {
    current.current = next;
    setProducts(next);
    if (Platform.OS === 'web') {
      try { globalThis.localStorage.setItem(storageKey, JSON.stringify(next)); }
      catch { /* A sessão continua em memória. */ }
    }
  }
  function add(name: string, priceCents: number, quantity: number) {
    const id = current.current.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    const product = { id, name: name.trim(), priceCents, quantity };
    update([product, ...current.current]);
    return product;
  }
  function withdraw(id: number, quantity: number) {
    const item = current.current.find(product => product.id === id);
    if (!item || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > item.quantity) return;
    const balance = item.quantity - quantity;
    update(current.current.map(product => product.id === id ? { ...product, quantity: balance } : product));
    return { productId: id, quantity, balance };
  }
  return <InventoryContext.Provider value={{ products, add, withdraw }}>{children}</InventoryContext.Provider>;
}
export function useInventory() {
  const value = useContext(InventoryContext);
  if (!value) throw new Error('InventoryProvider ausente.');
  return value;
}
