import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message } = body;

        const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!;

        // Send message to n8n Webhook
        const response = await axios.post(N8N_WEBHOOK_URL, {
            message,
            userId: "123",
        });

        return NextResponse.json({ reply: response.data.output });
    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json(
            { error: "Failed to process message" },
            { status: 500 }
        );
    }
}
