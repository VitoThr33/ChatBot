import { NextRequest, NextResponse } from "next/server";

export async function GET (request: Request) {
    return new Response ('Hello, Next.js!')
}
export async function POST (request: Request) {
    const {userText} = await request.json();
    
    
    
    return NextResponse.json({message: userText}, {status: 200});
}