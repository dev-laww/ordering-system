import CredentialsProvider from 'next-auth/providers/credentials'


export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const authUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/auth'

                const response = await fetch(`${authUrl}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                })

                const res = await response.json()

                if (!response.ok) return null

                return res.data
            },
            callbacks: {
                async jwt({token, user}) {
                    return { ...token, ...user }
                },
                async session({session, token}) {
                    session.accessToken = token.accessToken
                    session.refreshToken = token.refreshToken

                    return session
                }
            }
        })
    ]
}
