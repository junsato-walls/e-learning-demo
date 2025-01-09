import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    console.log(req)
    console.log("test")
return NextResponse.json("Webhook")
    
}