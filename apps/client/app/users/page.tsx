'use client'

import { trpc } from '@/utils/trpc'
import { Spinner, Card, CardBody } from '@heroui/react'

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
      {users?.map((user) => (
        <Card key={user.code} className="text-center">
          <CardBody className="text-center gap-3">
            <p className="text-gray-800 dark:text-gray-400 text-sm">
              {user.forename} {user.surname}
            </p>
            <p className="text-gray-600 dark:text-gray-500 text-xs">{user.code}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
