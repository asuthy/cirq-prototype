import { db } from '@cirq/api/utils/db'

export async function userLogin(username: string, password: string) {
  try {
    const user = await db
      .selectFrom('t_user')
      .select(['code as id', 'login_name', 'forename', 'surname', 'email_address'])
      .where('login_name', '=', username)
      .where('password', '=', password)
      .executeTakeFirst()

    if (!user) {
      throw new Error('Invalid credentials')
    }

    return user
  } catch (err) {
    console.error(err)
    throw new Error('Login failed')
  }
}
