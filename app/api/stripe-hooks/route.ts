import { NextResponse } from "next/server";

export async function POST(req: NextResponse){
    console.log("webhook dispatch")
    return NextResponse.json({received: true})
}