'use client'
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

const AuthProvider = ({children}:PropsWithChildren) => {
  return (
    <SessionProvider>{children}</SessionProvider> //to pass the authentication session to the component tree
  )
}

export default AuthProvider