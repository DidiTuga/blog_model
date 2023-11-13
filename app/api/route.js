import { NextRequest, NextResponse } from "next/server"
import { Publicacao} from "../lib/data.js"

export async function GET(request) {
    try {
        
        // Obtendo os parâmetros da requisição, se necessário
        //const body = request.nextUrl.searchParams;
        //console.log(body.get("id_pub"));

        // Aguardando a resolução da Promise retornada por getPublicacoes
        const posts = await Publicacao.getPublicacoes();

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
// recebe os dados do formulário
export async function POST({body}){
    try{
        const {title_pub, text_pub, ID_user, edit_pub} = body
        const data_pub = new Date()
        const publ = new Publicacao(data_pub, title_pub, text_pub, ID_user, edit_pub)
        const newPubl = Publicacao.addPubl(publ)
        return NextResponse.json({message: "OK", newPubl}, { status: 200 })
    } catch (error) {
        return NextResponse.json({message: "Erro", error}, { status: 500 })
    }
}
// recebe o id do publicacao para ser excluído
export async function DELETE({body}){
    try{
        const {ID_pub} = body
        const publ = Publicacao.deletePubl(ID_pub)
        return NextResponse.json({message: "OK", publ}, { status: 200 })
    } catch (error) {
        return NextResponse.json({message: "Erro", error}, { status: 500 })
    }
}
// recebe os dados do formulário
export async function PUT({body}){
    try{
        const {ID_pub, data_pub, title_pub, text_pub, ID_user, edit_pub} = body
        const publ = new Publicacao(ID_pub, data_pub, title_pub, text_pub, ID_user, edit_pub)
        const newPubl = Publicacao.updatePubl(publ)
        return NextResponse.json({message: "OK", newPubl}, { status: 200 })
    } catch (error) {
        return NextResponse.json({message: "Erro", error}, { status: 500 })
    }
}


