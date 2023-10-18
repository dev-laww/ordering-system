import CredentialsProvider from 'next-auth/providers/credentials'


export const authOptions = {
    providers: [
        CredentialsProvider({
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
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => ({ ...token, ...user }),
        session: async ({ session, token }) => {
            const { accessToken, refreshToken, sub, iat, exp, jti, ...user } = token

            session.user = user
            session.accessToken = accessToken
            session.refreshToken = refreshToken

            return session
        }
    }
}
