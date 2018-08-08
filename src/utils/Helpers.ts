export const getKeyByValue = (object: any, value: number): string | undefined => {
  return Object.keys(object).find(key => object[key] === value);
};

export const helpers: any[] = [
  getKeyByValue
];
