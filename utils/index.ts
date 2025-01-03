export const getDomain = () => {
  return new URL(process.env.NODE_ENV === 'production' ? 'https://coffee-finder-rho.vercel.app' : 'http://localhost:3000')
}