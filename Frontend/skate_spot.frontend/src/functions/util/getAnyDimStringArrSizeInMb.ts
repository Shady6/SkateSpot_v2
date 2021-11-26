import { getStringSizeInMb } from './getStringSizeInMb'

export const getAnyDimStringArrSizeInMb = (arr: any) => {
  return (
    Math.round(
      arr.reduce((prev: number, curr: string) => {
        if (Array.isArray(curr)) return prev + getAnyDimStringArrSizeInMb(curr)
        else return prev + getStringSizeInMb(curr)
      }, 0) * 100
    ) / 100
  )
}
