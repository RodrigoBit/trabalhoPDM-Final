export interface Product {
  id: number;
  name: string;
  priceCents: number;
  quantity: number;
}
export interface Withdrawal {
  productId: number;
  quantity: number;
  balance: number;
}
export const demoStock: Product[] = [
  { id: 1, name: 'Caixa de papelão média', priceCents: 650, quantity: 48 },
  { id: 2, name: 'Fita adesiva kraft', priceCents: 1480, quantity: 4 },
  { id: 3, name: 'Envelope de segurança', priceCents: 215, quantity: 32 },
  { id: 4, name: 'Etiqueta térmica em rolo', priceCents: 3290, quantity: 0 },
];
export const sku = (id: number) => 'ALM-' + String(id).padStart(3, '0');
export const money = (cents: number) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const lowLimit = 5;
export const status = (quantity: number) => quantity === 0 ? 'Esgotado' : quantity <= lowLimit ? 'Baixo' : 'Regular';
export function readQuantity(input: string): number | undefined {
  const value = Number(input.trim());
  return /^\d+$/.test(input.trim()) && Number.isSafeInteger(value) ? value : undefined;
}
export function readPrice(input: string): number | undefined {
  const match = /^(\d+)(?:[,.](\d{1,2}))?$/.exec(input.trim());
  if (!match) return undefined;
  const cents = Number(match[1] + (match[2] ?? '').padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents > 0 ? cents : undefined;
}
export function searchKey(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLocaleLowerCase('pt-BR');
}
