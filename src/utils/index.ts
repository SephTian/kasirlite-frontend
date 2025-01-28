import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

// Changing NUMBER = 15750 to PRICE FORMAT = 15.750
export function formatNumberToPrice(unformatedPrice: number): string {
  let stringPrice = unformatedPrice.toString();
  let isMinus = false;
  if (stringPrice.charAt(0) === '-') {
    isMinus = true;
  }
  stringPrice = formatPrice(stringPrice);
  stringPrice = isMinus ? '-' + stringPrice : stringPrice;
  return stringPrice;
}

// Changing PRICE FORMAT = 15.750 to NUMBER = 15750
export function formatPriceToNumber(formatedPrice: string): number {
  const result = formatedPrice.replace(/[^0-9]/g, '');

  return parseInt(result);
}

// Changing UNFORMATTED PRICE = 1215750 to FORMATTED PRICE = 1.215.750
export function formatPrice(price: string): string {
  let formatedPrice = price.replace(/\D/g, ''); // Delete all char not number
  formatedPrice = formatedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Make number to be currency
  return formatedPrice;
}

export function paramsChange(key: string, value: string, searchParams: string): string {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  return params.toString();
}

dayjs.extend(utc);
dayjs.extend(timezone);
export function formatDateToLocale(date: string): string {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate = dayjs.utc(date).tz(userTimeZone).format('YYYY-MM-DDTHH:mm:ss');
  return formattedDate;
}
