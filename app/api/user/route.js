import { NextRequest, NextResponse } from "next/server";
import { User } from "../../lib/data.js";

export async function GET(request) {
    try {
        // Aguardando a resolução da Promise retornada por getUsers
        const users = await User.getUsers();
    
        // Transformando em JSON
        const jsonData = { message: "OK", users };
    
        // Retornando a resposta
        return NextResponse.json(jsonData, { status: 200 });
    } catch (error) {
        // Tratando erros e retornando uma resposta de erro
        console.error("Erro:", error);
        return NextResponse.json({ message: "Erro", error }, { status: 500 });
    }
}
    // recebe os dados do formulário
export async function POST(request) {
    try {
        // Obter automaticamente os dados JSON da requisição
        const data = await request.json();
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const image = data.image;

        // Simulando a adição de uma publicação (ajuste conforme sua lógica real)
        const newUser = new User(1, name, email, image, password);
        User.addUser(newUser);
        // Retornar uma resposta com os dados da nova publicação
        return new Response(JSON.stringify({ message: "OK", newUser }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        });
    } catch (error) {
        // Retornar uma resposta de erro
        return new Response(JSON.stringify({ message: "Erro", error }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
        });
    }
}
// apagar um user

export async function DELETE(request) {
    try {
        // Obter automaticamente os dados JSON da requisição
        const data = await request.json();
        const id = data.id;

        // Simulando a adição de uma publicação (ajuste conforme sua lógica real)
        User.deleteUserByID(id);
        // Retornar uma resposta com os dados da nova publicação
        return new Response(JSON.stringify({ message: "OK", id }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        });
    } catch (error) {
        // Retornar uma resposta de erro
        return new Response(JSON.stringify({ message: "Erro", error }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
        });
    }
}
// atualizar um user

export async function PUT(request) {
    try {
        // Obter automaticamente os dados JSON da requisição
        const data = await request.json();
        const id = data.id;
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const image = data.image;
        const user = User.getUserByID(id);

        // Simulando a adição de uma publicação (ajuste conforme sua lógica real)
        User.updateUserByID(id, name, email, image, password);
        // Retornar uma resposta com os dados da nova publicação
        return new Response(JSON.stringify({ message: "OK", user }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        });
    } catch (error) {
        // Retornar uma resposta de erro
        return new Response(JSON.stringify({ message: "Erro", error }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
        });
    }
}