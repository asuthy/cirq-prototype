'use client'

import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardBody, Input, Button, Spinner, Chip } from '@heroui/react'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoggingIn(true)

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (res?.ok) {
      router.push('/users')
    } else {
      setError('Invalid username or password')
      setIsLoggingIn(false)
    }
  }

  const isButtonDisabled = !username || !password

  if (status === 'loading' || isLoggingIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div>Logged in as {session.user?.name || session.user?.email}</div>
          <Button color="primary" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardBody>
          <form onSubmit={handleLogin} className="space-y-6 p-4">
            <Input
              id="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={isButtonDisabled}
              isDisabled={isButtonDisabled}
            >
              Login
            </Button>
            {error && <p className="text-center text-red-500 text-sm">{error}</p>}
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
