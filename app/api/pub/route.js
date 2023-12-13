import { NextRequest, NextResponse } from "next/server";
import { Publicacao } from "../../lib/data.js";

export async function GET(request) {
  try {
    // Aguardando a resolução da Promise retornada por getPublicacoes
    const posts = await Publicacao.getPublicacoes();

    // Transformando em JSON
    const jsonData = { message: "OK", posts };

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
    const data_pub = new Date().toISOString().slice(0, 19).replace("T", " ");
    const text = data.text;
    const title = data.title;

    // Simulando a adição de uma publicação (ajuste conforme sua lógica real)
    const newPubl = new Publicacao(1, data_pub, title, text, 0, 0);
    Publicacao.addPubl(newPubl);
    // Retornar uma resposta com os dados da nova publicação
    return new Response(JSON.stringify({ message: "OK", newPubl }), {
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

// apagar uma publicação

export async function DELETE(request) {
  try {
    // Obter automaticamente os dados JSON da requisição
    const data = await request.json();
    const id = data.id;

    // Simulando a adição de uma publicação (ajuste conforme sua lógica real)
    Publicacao.deletePublicacaoByID(id);
    // Retornar uma resposta com os dados da nova publicação
    return new Response(JSON.stringify({ message: "OK" }), {
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
export async function PUT(request) {
  try {
    // Obter automaticamente os dados JSON da requisição
    const data = await request.json();
    const id = data.id;
    const text = data.text;
    const title = data.title;
    const publ = Publicacao.getPublicacaoByID(id);

    if (text == "") {
      Publicacao.updatePublicacaoByID(id, title, publ.getText_pub);
    }
    if (title == "") {
      Publicacao.updatePublicacaoByID(id, publ.getTitle_pub, text);
    } else {
      Publicacao.updatePublicacaoByID(id, title, text);
    }

    // Simulando a adição de uma publicação (ajuste conforme sua lógica real)

    // Retornar uma resposta com os dados da nova publicação
    return new Response(JSON.stringify({ message: "OK" }), {
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
