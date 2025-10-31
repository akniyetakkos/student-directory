export const isEmail = (s) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(s).toLowerCase())
}
