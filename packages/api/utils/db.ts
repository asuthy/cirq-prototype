import { config } from '@cirq/api/utils/config'
import { DB } from '@cirq/types/db.d'
import * as tedious from 'tedious'
import * as tarn from 'tarn'
import { Kysely, MssqlDialect } from 'kysely'

const dialect = new MssqlDialect({
  tarn: {
    ...tarn,
    options: {
      min: 0,
      max: 10,
    },
  },
  tedious: {
    ...tedious,
    connectionFactory: () =>
      new tedious.Connection({
        authentication: {
          options: {
            userName: config.db.user,
            password: config.db.password,
          },
          type: 'default',
        },
        options: {
          database: config.db.name,
          port: config.db.port || 1433,
          trustServerCertificate: true,
        },
        server: config.db.server,
      }),
  },
})

export const db = new Kysely<DB>({
  dialect,
})
