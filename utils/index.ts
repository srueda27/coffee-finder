export const getDomain = () => {
  return new URL(process.env.NODE_ENV === 'production' ? 'vercel_route' : 'http://localhost:3000')
}