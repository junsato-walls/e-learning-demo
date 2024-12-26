import { NextResponse } from "next/server";

export async function POST(req: NextResponse){
    console.log("webhook dispatch")
    console.log(req)
    return NextResponse.json({received: true})
}