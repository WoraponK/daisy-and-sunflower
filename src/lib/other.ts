export const formatSecondPad = (value?: number) => {
  return (value ?? 0).toString().padStart(2, '0')
}
