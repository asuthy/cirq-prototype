'use client'

import { trpc } from '../../utils/trpc'

export default function Home() {
  const { data: users, isLoading } = trpc.getUsers.useQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-6">Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users?.map((user) => (
            <div
              key={user.code}
              className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out text-center"
            >
              <h3 className="mb-2">{user.login_name}</h3>
              <p className="text-gray-600 text-sm">{user.password}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
