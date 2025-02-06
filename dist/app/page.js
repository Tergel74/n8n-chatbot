"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = __importDefault(require("react"));
var Chatbot_1 = require("../components/Chatbot");
function Home() {
    return (react_1.default.createElement(Chatbot_1.Chatbot, { webhookUrl: "https://your-n8n-webhook-url", customStyles: {
            container: "custom-container-class",
            userMessage: "custom-user-message-class",
            botMessage: "custom-bot-message-class",
        }, placeholder: "Ask me anything...", sendButtonText: "Send Message" }));
}
