import React from "react";
export interface ChatbotProps {
    webhookUrl: string;
    customStyles?: {
        container?: string;
        messageContainer?: string;
        userMessage?: string;
        botMessage?: string;
        inputContainer?: string;
        input?: string;
        sendButton?: string;
    };
    placeholder?: string;
    sendButtonText?: string;
}
export declare const Chatbot: ({ webhookUrl, customStyles, placeholder, sendButtonText, }: ChatbotProps) => React.JSX.Element;
