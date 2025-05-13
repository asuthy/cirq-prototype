'use client'

import { trpc } from '@/utils/trpc'
import { Spinner, Card, CardBody } from '@heroui/react'
import { formatDistanceToNow } from 'date-fns'

export default function Home() {
  const { data: users, isLoading } = trpc.user.getUsers.useQuery()

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
      {users?.map((user) => {
        const lastLogonText =
          user.last_logon_dt &&
          formatDistanceToNow(new Date(user.last_logon_dt), { addSuffix: true })

        return (
          <Card key={user.code} className={`text-center ${user.suspended ? 'opacity-20' : ''}`}>
            <CardBody className="text-center gap-3">
              <p className="text-gray-800 dark:text-gray-400 text-sm">
                {user.title} {user.forename} {user.surname}
              </p>
              <p className="text-gray-600 dark:text-gray-500 text-xs">{user.code}</p>
              <p
                className={`text-gray-600 dark:text-gray-500 text-xs ${
                  user.last_logon_dt ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Last login: {lastLogonText}
              </p>
            </CardBody>
          </Card>
        )
      })}
    </div>
  )
}
