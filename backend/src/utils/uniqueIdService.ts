const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function generateId(length = 10): string {
  let result = '';
  const charactersLength = ALPHABET.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += ALPHABET[randomIndex];
  }
  return result;
}
