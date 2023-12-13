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
    callbacks: {
        async signIn(user, account, profile) {
            try {
                // Chame sua própria API para salvar os dados na sua base de dados
                await axios.post('http://sua-api.com/salvar-usuario', {
                    name : profile.name,
                    email : profile.email,
                    image : profile.image,
                    password : "",
                });
            } catch (error) {
                console.error('Erro ao salvar usuário na base de dados:', error);
                return false; // Retorne falso para cancelar o login em caso de erro
            }
            return true;
        },
    },
    });

export {handler as GET, handler as POST}