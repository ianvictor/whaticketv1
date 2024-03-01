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
const SendWhatsAppGroupNasa= ({ newMessAgeGroupNasa, ticketwhatsappId }) => __awaiter(void 0, void 0, void 0, function* () {
    const wbot2 = yield GetTicketWbot_1.default(ticketwhatsappId);
    function delay(t, v) {
        return new Promise(function(resolve) { 
            setTimeout(resolve.bind(null, v), t)
        });
     }
    try {
        let newMsgGroupNasa = newMessAgeGroupNasa;
        wbot2.getChats().then(chats => {
            const groups = chats.filter(chat => chat.isGroup);
            if (groups.length == 0) {
              console.log('You have no group yet.');
            } else {
              groups.forEach((group, i) => {
                const participants = group.participants;
                    participants.forEach((participant, i) => {
                        const user = `${participant.id.user}@c.us`//.replace(/\D/g, '');
                        delay(3000).then(function() {
                            const sentMessage2 = wbot2.sendMessage(user, newMsgGroupNasa);
                            return sentMessage2;
                        });
                    });
              });
            }
          });
    }
    catch (err) {
        throw new AppError_1.default("ERR_NASA_WAPP_GROUP");
    }
});
exports.default = SendWhatsAppGroupNasa;
