import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";



const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
        // ...add more providers here
    ],
    callbacks: {
        
    },
    });

export {handler as GET, handler as POST}