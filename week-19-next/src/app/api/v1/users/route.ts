import next from "next";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        'name': 'kirat',
        'email': 'kirat@gmail.com'
    });
}