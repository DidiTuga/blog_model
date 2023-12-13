import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

async function isUserRegistered(userId) {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/`);
      const users = response.data.users;
      const user = users.find((user) => user.id === userId);
      if (user !== null) {
        return false;
      }else {
        return true;
      }
    } catch (error) {
      console.error('Erro ao verificar usuário na base de dados:', error);
      return false; // Em caso de erro, retorna false para evitar registro repetido
    }
  }

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
                const isRegistered = await isUserRegistered(user.id);
                if (!isRegistered) {
                // Chame sua própria API para salvar os dados na sua base de dados
                await axios.post('http://localhost:3000/api/user', {
                    id : user.user.id,
                    name : user.user.name,
                    email : user.user.email,
                    image : user.user.image,
                });
                }
            } catch (error) {
                console.error('Erro ao salvar usuário na base de dados:', error);
                return false; // Retorne falso para cancelar o login em caso de erro
            }
            return true;
        },
    },
    });

export {handler as GET, handler as POST}