export function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

export function formatPrice(unformatedPrice: number): string {
  let stringPrice = unformatedPrice.toString();
  let isMinus = false;
  if (stringPrice.charAt(0) === '-') {
    isMinus = true;
  }
  stringPrice = stringPrice.replace(/\D/g, ''); // Delete all char not number
  stringPrice = stringPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Make number to be currency
  stringPrice = isMinus ? '-' + stringPrice : stringPrice;
  return stringPrice;
}

export function unformatPrice(formatedPrice: string): number {
  const result = formatedPrice.replace(/[^0-9]/g, '');

  return parseInt(result);
}
