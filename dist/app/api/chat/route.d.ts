import { NextRequest, NextResponse } from "next/server";
export declare function POST(req: NextRequest): Promise<NextResponse<{
    reply: any;
}> | NextResponse<{
    error: string;
}>>;
