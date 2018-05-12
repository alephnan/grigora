import * as fs from 'fs'
import * as jsonfile from 'jsonfile'
import * as path from 'path'

const REFRESH_TOKEN_FILE_PATH = path.resolve(__dirname, 'refresh_tokens.json')
const ACCESS_TOKEN_FILE_PATH = path.resolve(__dirname, 'access_tokens.json')

// TODO: Persist to Memcached instead of flat file.
class TokenStore {
  setRefreshToken(id, refreshToken) {
    if (!id) throw new Error('id not provided')
    if (!refreshToken) throw new Error('refresh Token not provided')

    const obj = fs.existsSync(REFRESH_TOKEN_FILE_PATH) ? jsonfile.readFileSync(REFRESH_TOKEN_FILE_PATH) : {}
    // Refresh token unchanged. Don't need to update.
    if (obj[id] == refreshToken) {
      return;
    } else {
      obj[id] = refreshToken
      jsonfile.writeFileSync(REFRESH_TOKEN_FILE_PATH, obj)
    }
  }

  getRefreshToken(id) {
    if (!fs.existsSync(REFRESH_TOKEN_FILE_PATH)) throw new Error('No store')

    const obj = jsonfile.readFileSync(REFRESH_TOKEN_FILE_PATH);
    return obj[id];
  }

  getAccessToken(refreshToken) {
    if (!fs.existsSync(ACCESS_TOKEN_FILE_PATH)) throw new Error('No store')

    const obj = jsonfile.readFileSync(ACCESS_TOKEN_FILE_PATH)
    const value = obj[refreshToken]
    const { accessToken } = value // dereference expiration date from here.
    // TODO: Refresh access token if necessary.
    return accessToken
  }

  setAccessToken(refreshToken, value) {
    const obj = fs.existsSync(ACCESS_TOKEN_FILE_PATH) ? jsonfile.readFileSync(ACCESS_TOKEN_FILE_PATH) : {}
    obj[refreshToken] = value
    jsonfile.writeFileSync(ACCESS_TOKEN_FILE_PATH, obj)
  }
}

export const tokenStore = new TokenStore()