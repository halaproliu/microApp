import path from 'path'

export const resolve = (url: string) => {
  return path.resolve(__dirname, url)
}
