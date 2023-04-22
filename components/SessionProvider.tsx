'use client'

import { Session } from "next-auth"
// next auth Provider
import { SessionProvider as Provider } from "next-auth/react"

type Props = {
    session: Session | null,
    children: React.ReactNode
}

export function SessionProvider({ session, children }: Props) {
    console.log(session?.expires);
    return (
        <Provider>
            {children}
        </Provider>
    )
}