export const getStringSizeInMb = (x: string) =>
  Math.round((new TextEncoder().encode(x).length / 1024 / 1024) * 100) / 100;
