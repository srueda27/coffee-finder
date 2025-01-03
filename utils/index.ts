export const getDomain = () => {
  return new URL(process.env.NODE_ENV === 'production' ? 'https://my-app.vercel.app' : 'http://localhost:3000')
}