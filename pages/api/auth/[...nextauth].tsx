import { fetchLoginAPI } from "lib/http"
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string,
        user: {
            /** The user's postal address. */
        } & DefaultSession["user"]
    }
}
export const authOptions: NextAuthOptions  = {
    // Configure one or more authentication providers
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account }: any) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                const accessToken = await fetchLoginAPI(account.access_token);
                token.accessToken = accessToken
            }
            return token
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }

    }
}
export default NextAuth(authOptions)