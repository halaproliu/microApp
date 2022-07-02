import path from 'path'
import dotenv from 'dotenv'
// import dotenvExpand from 'dotenv-expand'
const dotenvExpand = require('dotenv-expand')

export const resolve = (url: string) => {
  return path.resolve(__dirname, url)
}

export const loadEnv = (envPath: any) => {
  try {
    const env = dotenv.config({ path: envPath })
    dotenvExpand(env)
  } catch (err) { }
}