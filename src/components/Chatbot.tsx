"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

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
    userId?: string;
}

export const Chatbot = ({
    webhookUrl,
    customStyles = {},
    placeholder = "Type your message...",
    sendButtonText = "Send",
    userId,
}: ChatbotProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: messages.length,
            text: inputText,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsTyping(true);

        try {
            // Send message to n8n Webhook
            const response = await axios.post(webhookUrl, {
                message: inputText,
                userId: userId,
            });

            const data = response.data;

            const botMessage: Message = {
                id: messages.length + 1,
                text: data.output,
                sender: "bot",
            };

            setIsTyping(false);
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error);
            const errorMessage: Message = {
                id: messages.length + 1,
                text: "Sorry, I encountered an error. Please try again.",
                sender: "bot",
            };
            setIsTyping(false);
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <div
            className={`flex flex-col h-screen max-w-2xl mx-auto p-4 ${
                customStyles.container || ""
            }`}
        >
            <div
                className={`flex-1 overflow-y-auto mb-4 space-y-4 pr-4 ${
                    customStyles.messageContainer || ""
                }`}
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender === "user"
                                    ? `bg-blue-500 text-white ${
                                          customStyles.userMessage || ""
                                      }`
                                    : `bg-gray-200 text-gray-800 ${
                                          customStyles.botMessage || ""
                                      }`
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 rounded-lg p-3 max-w-[70%]">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`flex gap-2 ${customStyles.inputContainer || ""}`}
            >
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={placeholder}
                    className={`flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${
                        customStyles.input || ""
                    }`}
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                        customStyles.sendButton || ""
                    }`}
                >
                    {sendButtonText}
                </button>
            </form>
        </div>
    );
};
