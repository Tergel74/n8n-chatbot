"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chatbot = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var Chatbot = function (_a) {
    var webhookUrl = _a.webhookUrl, _b = _a.customStyles, customStyles = _b === void 0 ? {} : _b, _c = _a.placeholder, placeholder = _c === void 0 ? "Type your message..." : _c, _d = _a.sendButtonText, sendButtonText = _d === void 0 ? "Send" : _d;
    var _e = (0, react_2.useState)([]), messages = _e[0], setMessages = _e[1];
    var _f = (0, react_2.useState)(""), inputText = _f[0], setInputText = _f[1];
    var _g = (0, react_2.useState)(false), isTyping = _g[0], setIsTyping = _g[1];
    var messagesEndRef = (0, react_2.useRef)(null);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    (0, react_2.useEffect)(function () {
        scrollToBottom();
    }, [messages]);
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var userMessage, response, data, botMessage_1, error_1, errorMessage_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!inputText.trim())
                        return [2 /*return*/];
                    userMessage = {
                        id: messages.length,
                        text: inputText,
                        sender: "user",
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
                    setInputText("");
                    setIsTyping(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(webhookUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ message: inputText }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    botMessage_1 = {
                        id: messages.length + 1,
                        text: data.reply,
                        sender: "bot",
                    };
                    setIsTyping(false);
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [botMessage_1], false); });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    errorMessage_1 = {
                        id: messages.length + 1,
                        text: "Sorry, I encountered an error. Please try again.",
                        sender: "bot",
                    };
                    setIsTyping(false);
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [errorMessage_1], false); });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", { className: "flex flex-col h-screen max-w-2xl mx-auto p-4 ".concat(customStyles.container || "") },
        react_1.default.createElement("div", { className: "flex-1 overflow-y-auto mb-4 space-y-4 pr-4 ".concat(customStyles.messageContainer || "") },
            messages.map(function (message) { return (react_1.default.createElement("div", { key: message.id, className: "flex ".concat(message.sender === "user"
                    ? "justify-end"
                    : "justify-start") },
                react_1.default.createElement("div", { className: "max-w-[70%] rounded-lg p-3 ".concat(message.sender === "user"
                        ? "bg-blue-500 text-white ".concat(customStyles.userMessage || "")
                        : "bg-gray-200 text-gray-800 ".concat(customStyles.botMessage || "")) }, message.text))); }),
            isTyping && (react_1.default.createElement("div", { className: "flex justify-start" },
                react_1.default.createElement("div", { className: "bg-gray-200 rounded-lg p-3 max-w-[70%]" },
                    react_1.default.createElement("div", { className: "flex space-x-2" },
                        react_1.default.createElement("div", { className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce" }),
                        react_1.default.createElement("div", { className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" }),
                        react_1.default.createElement("div", { className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" }))))),
            react_1.default.createElement("div", { ref: messagesEndRef })),
        react_1.default.createElement("form", { onSubmit: handleSubmit, className: "flex gap-2 ".concat(customStyles.inputContainer || "") },
            react_1.default.createElement("input", { type: "text", value: inputText, onChange: function (e) { return setInputText(e.target.value); }, placeholder: placeholder, className: "flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ".concat(customStyles.input || "") }),
            react_1.default.createElement("button", { type: "submit", className: "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ".concat(customStyles.sendButton || "") }, sendButtonText))));
};
exports.Chatbot = Chatbot;
