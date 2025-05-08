import jwt from 'jsonwebtoken'

export const isValidToken = (token: string | undefined): boolean => {
  if (!token) return false
  try {
    // Validate token with your secret (same one used in JWT signing)
    jwt.verify(token, 'REPLACE_WITH_REAL_SECRET')
    return true
  } catch (error) {
    return false
  }
}
