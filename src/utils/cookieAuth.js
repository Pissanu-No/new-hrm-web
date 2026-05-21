const ACCESS_TOKEN_PREFIXES = ['accesss_token', 'access_token']
const CURRENT_USER_PREFIX = 'current_user'
const REFRESH_TOKEN_PREFIX = 'refresh_token'

function getTokenCookieEnv() {
  return import.meta.env.VITE_TOKEN_COOKIE_ENV || ''
}

function getCookieEntries() {
  if (typeof document === 'undefined') return []

  return document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .map((cookie) => {
      const separatorIndex = cookie.indexOf('=')
      const name = separatorIndex >= 0 ? cookie.slice(0, separatorIndex) : cookie
      const value = separatorIndex >= 0 ? cookie.slice(separatorIndex + 1) : ''

      return {
        name: safeDecodeURIComponent(name),
        value: normalizeCookieValue(safeDecodeURIComponent(value))
      }
    })
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function normalizeCookieValue(value) {
  if (!value) return value

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }

  return value
}

function getCookieValue(cookieName) {
  return getCookieEntries().find((cookie) => cookie.name === cookieName)?.value || null
}

function buildCookieName(prefix, userId, cookieEnv = getTokenCookieEnv()) {
  if (!userId) return null

  if (cookieEnv === 'prod') {
    return `${prefix}_${userId}`
  }

  return `${prefix}_${cookieEnv}_${userId}`
}

function findCookieByPrefix(prefix, cookieEnv = getTokenCookieEnv()) {
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern =
    cookieEnv === 'prod'
      ? new RegExp(`^${escapedPrefix}_(.+)$`)
      : new RegExp(`^${escapedPrefix}_${cookieEnv}_(.+)$`)

  const cookie = getCookieEntries().find((entry) => pattern.test(entry.name))
  const userId = cookie?.name.match(pattern)?.[1] || null

  return {
    value: cookie?.value || null,
    userId
  }
}

export function getAuthCookieNames(userId) {
  return {
    accessToken: buildCookieName(ACCESS_TOKEN_PREFIXES[0], userId),
    accessTokenFallback: buildCookieName(ACCESS_TOKEN_PREFIXES[1], userId),
    currentUser: buildCookieName(CURRENT_USER_PREFIX, userId),
    refreshToken: buildCookieName(REFRESH_TOKEN_PREFIX, userId)
  }
}

export function getCurrentUserIdFromCookies() {
  return (
    findCookieByPrefix(CURRENT_USER_PREFIX).userId ||
    findCookieByPrefix(ACCESS_TOKEN_PREFIXES[0]).userId ||
    findCookieByPrefix(ACCESS_TOKEN_PREFIXES[1]).userId ||
    findCookieByPrefix(REFRESH_TOKEN_PREFIX).userId
  )
}

export function getAccessTokenFromCookies(userId = getCurrentUserIdFromCookies()) {
  for (const prefix of ACCESS_TOKEN_PREFIXES) {
    const cookieName = buildCookieName(prefix, userId)

    if (cookieName) {
      const token = getCookieValue(cookieName)

      if (token) return normalizeBearerToken(token)
    }
  }

  for (const prefix of ACCESS_TOKEN_PREFIXES) {
    const token = findCookieByPrefix(prefix).value

    if (token) return normalizeBearerToken(token)
  }

  return null
}

export function getRefreshTokenFromCookies(userId = getCurrentUserIdFromCookies()) {
  const cookieName = buildCookieName(REFRESH_TOKEN_PREFIX, userId)

  if (cookieName) {
    return getCookieValue(cookieName)
  }

  return findCookieByPrefix(REFRESH_TOKEN_PREFIX).value
}

export function getCurrentUserFromCookies(userId = getCurrentUserIdFromCookies()) {
  const cookieName = buildCookieName(CURRENT_USER_PREFIX, userId)
  const rawUser = cookieName ? getCookieValue(cookieName) : findCookieByPrefix(CURRENT_USER_PREFIX).value

  if (!rawUser) return null

  try {
    return JSON.parse(rawUser)
  } catch {
    return rawUser
  }
}

function normalizeBearerToken(token) {
  if (!token) return null

  return token.startsWith('Bearer ') ? token.slice('Bearer '.length) : token
}
