'use client'

import { trpc } from '../../utils/trpc'

export default function Home() {
  const { data: users, isLoading } = trpc.getUsers.useQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-2">
        {users?.map((user) => (
          <div key={user.code} className="border p-2 rounded-lg text-center">
            <h3 className="">{user.login_name}</h3>
            <p className="text-gray-600">{user.password}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
