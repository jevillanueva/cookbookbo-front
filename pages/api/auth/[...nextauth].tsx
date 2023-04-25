import { fetchLoginAPI } from "lib/http"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        // async signIn({ account, profile }) {
        //     if (account.provider === "google") {
        //         console.log("profile", profile)
        //         console.log("account", account)
        //         await fetchLoginAPI(account.accessToken).then((response) => {
        //             console.log("response", response)
        //             user.accessToken = response.data.token
        //         })
        //         return true
        //     }
        //     return true // Do different verification for other providers that don't have `email_verified`
        // },
        // async signIn({ user, account, profile, email, credentials }) {
        //     console.log("user", user)
        //     console.log("account", account)
        //     console.log("profile", profile)
        //     console.log("email", email)
        //     console.log("credentials",credentials)

        //     await fetchLoginAPI(account.accessToken).then((response) => {
        //         console.log("response", response)
        //         user.accessToken = response.data.token
        //     })
        //     return true
        // },



        async jwt({ token, account }: any) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                console.log("token", token)
                console.log("account", account)
                const accessToken = await fetchLoginAPI(account.access_token);
                token.accessToken = accessToken
                console.log("token_post", token)
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