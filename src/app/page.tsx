"use client";

import React from "react";
import { Chatbot } from "../components/Chatbot";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

export default function Home() {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!;
    return (
        <Chatbot
            webhookUrl={webhookUrl}
            customStyles={{
                container: "custom-container-class",
                userMessage: "custom-user-message-class",
                botMessage: "custom-bot-message-class",
            }}
            placeholder="Ask me anything..."
            sendButtonText="Send"
            userId="123"
        />
    );
}
