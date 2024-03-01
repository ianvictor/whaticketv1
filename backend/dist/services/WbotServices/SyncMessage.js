"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const GetTicketWbot_1 = __importDefault(require("../../helpers/GetTicketWbot2"));
const wbotMessageListener_1 = require("./wbotMessageListener");
const fetchMessage = ({ limit, ticketwhatsappId }) => __awaiter(void 0, void 0, void 0, function* () {
    const wbot2 = yield GetTicketWbot_1.default(ticketwhatsappId);
    try {
        const chats = yield wbot2.getChats();
        for (const chat of chats){
            let messages = yield chat.fetchMessages({limit: limit});
                for (const message of messages) {
                    if (messages.hasMedia){
                        console.log('Não é possível importar mídias via histórico.');
                    }
                    else {
                        yield wbotMessageListener_1.handleMessage(message, wbot2);
                        yield wbotMessageListener_1.handleMsgAck(message, 2);
                        console.log(JSON.stringify("messageFromMe: " + message.id.fromMe + " | messageRemote: " + message.id.remote +  " | messageID:" +  message.id.id + " | messageBody: " + message.body));
                    }
                    
                }
            

        }
        // const sentMessage2 = yield wbot2.sendMessage(number, message);
        // return sentMessage2;
    }
    catch (err) {
        throw new AppError_1.default("ERR_SENDING_WAPP_MSG");
    }
});
exports.default = fetchMessage;
