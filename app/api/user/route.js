import { NextRequest, NextResponse } from "next/server";
import { User } from "../../lib/data.js";

// Função para verificar se o usuário já está registrado no banco de dados


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
    const id = data.id;
    const image = data.image;

    const newUser = new User(id, name, email, image);
    User.addUser(newUser);

    // Retornar uma resposta com os dados de um novo user
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
    const image = data.image;
    const user = User.getUserByID(id);

    // Simulando a adição de uma publicação (ajuste conforme sua lógica real)
    User.updateUserByID(id, name, email, image);
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
