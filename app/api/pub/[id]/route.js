import { NextRequest, NextResponse } from "next/server"
import { Publicacao} from "../../../lib/data.js"

// vai buscar o id da publicação e retorna os dados da publicação
export async function GET(request) {
    try {
        
        // Obtendo os parâmetros da requisição, se necessário
        const body = request.nextUrl.searchParams;
        const id_pub = body.get("id_pub");
        //console.log(body.get("id_pub"));

        // Aguardando a resolução da Promise retornada por getPublicacoes
        const posts = await Publicacao.getPublicacao(id_pub);

        // Transformando em JSON
        const jsonData = { message: "OK", posts };

        // Retornando a resposta
        return NextResponse.json(jsonData, { status: 200 })
    } catch (error) {
        // Tratando erros e retornando uma resposta de erro
        console.error('Erro:', error);
        return NextResponse.json({ message: "Erro", error }, { status: 500 });
    }
}

