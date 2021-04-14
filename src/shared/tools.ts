export async function asyncFilter<T>(array: T[], predicate: (item: T) => Promise<boolean>) {
  const results = await Promise.all(array.map(predicate));
  return array.filter((_v, index) => results[index]);
}
