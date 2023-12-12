import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
        // ...add more providers here
    ],
    // A database is optional, but required to persist accounts in a database
    // database: process.env.DATABASE_URL,
    });

export {handler as GET, handler as POST}