import { NextRequest, NextResponse } from "next/server";
import { Publicacao } from "../../../lib/data.js";

export async function GET(request, context) {
    // buscar o valor [email] na URL
    const email  = context.params.email.join("@");
    
    try {
        const posts = await Publicacao.getPublicacoesByUser(email);
        const jsonData = { message: "OK", posts };
        return NextResponse.json(jsonData, { status: 200 });
        
    }catch (error) {
        console.error("Erro:", error);
        return NextResponse.json({ message: "Erro", error }, { status: 500 });
    }
}