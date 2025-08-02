export const formatSecondPad = (value?: number) => {
  return value?.toString().padStart(2, '0')
}
