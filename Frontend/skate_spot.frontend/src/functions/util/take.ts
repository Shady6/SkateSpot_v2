export const take = <T>(arr: Array<T>, count: number) =>
    arr.filter((_, i) => i < count)
