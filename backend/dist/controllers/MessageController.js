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
exports.remove = exports.store = exports.store2 = exports.store3 = exports.store4 = exports.store5 = exports.store6 = exports.store7 = exports.store8 = exports.store9 = exports.store10 = exports.store11 = exports.store12 = exports.store13 = exports.store14 = exports.store15 = exports.store16 = exports.store17 = exports.store18 = exports.store19 = exports.store20 = exports.store21 = exports.store22 = exports.store23 = exports.store24 = exports.store25 = exports.store26 = exports.store27 = exports.store28 = exports.store29 = exports.store30 = exports.store31 = exports.store32 = exports.store33 = exports.store34 = exports.store35 = exports.store40 = exports.store41 = exports.index = exports.index2 = exports.index3 = exports.index4 = exports.index5 = exports.index6 = exports.index7 = void 0;
const SetTicketMessagesAsRead_1 = __importDefault(require("../helpers/SetTicketMessagesAsRead"));
//const { default: GetWhatsAppId } = require("../helpers/GetWhatsAppId");
const socket_1 = require("../libs/socket");
const ListMessagesService_1 = __importDefault(require("../services/MessageServices/ListMessagesService"));
const ShowTicketService_1 = __importDefault(require("../services/TicketServices/ShowTicketService"));
const DeleteWhatsAppMessage_1 = __importDefault(require("../services/WbotServices/DeleteWhatsAppMessage"));
const SendWhatsAppMedia_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMedia"));
const SendWhatsAppMedia_2 = __importDefault(require("../services/WbotServices/SendWhatsAppMedia2"));
const SendWhatsAppMedia_3 = __importDefault(require("../services/WbotServices/SendWhatsAppMedia3"));
const SendWhatsAppMedia_4 = __importDefault(require("../services/WbotServices/SendWhatsAppMedia4"));
const SendWhatsAppMessage_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMessage"));
const SendWhatsAppMessage_2 = __importDefault(require("../services/WbotServices/SendWhatsAppMessage2"));
const SendWhatsAppAgendamento = __importDefault(require("../services/WbotServices/SendWhatsAppAgendamento"));
const SendWhatsAppList = __importDefault(require("../services/WbotServices/SendWhatsAppList"));
const SendWhatsAppButton = __importDefault(require("../services/WbotServices/SendWhatsAppButton"));
const SendDirect = __importDefault(require("../services/WbotServices/SendDirect"));
const SendSMS = __importDefault(require("../services/WbotServices/SendSMS"));
const MakeVoiceCall = __importDefault(require("../services/WbotServices/MakeVoiceCall"));
const ChangeGroupTitle = __importDefault(require("../services/WbotServices/ChangeGroupTitle"));
const ChangeGroupDescription = __importDefault(require("../services/WbotServices/ChangeGroupDescription"));
const SendWhatsAppGroup = __importDefault(require("../services/WbotServices/SendWhatsAppGroup"));
const SendWhatsAppGroupNASA = __importDefault(require("../services/WbotServices/SendWhatsAppGroupNASA"));
const CloseWhatsAppGroup = __importDefault(require("../services/WbotServices/CloseWhatsAppGroup"));
const OpenWhatsAppGroup = __importDefault(require("../services/WbotServices/OpenWhatsAppGroup"));
const CreateGroup = __importDefault(require("../services/WbotServices/CreateGroup"));
const SyncMessage = __importDefault(require("../services/WbotServices/SyncMessage"));
const SyncMessageUser = __importDefault(require("../services/WbotServices/SyncMessageUser"));
// const SetN8NOn = __importDefault(require("../services/WbotServices/SetN8NOn"));
// const SetN8NOff = __importDefault(require("../services/WbotServices/SetN8NOff"));
const SetDialogFlowOn = __importDefault(require("../services/WbotServices/SetDialogFlowOn"));
const SetDialogFlowOff = __importDefault(require("../services/WbotServices/SetDialogFlowOff"));
const SetDialogFlowOnAudio = __importDefault(require("../services/WbotServices/SetDialogFlowOnAudio"));
const SetDialogFlowOffAudio = __importDefault(require("../services/WbotServices/SetDialogFlowOffAudio"));
const SetChatBotOn = __importDefault(require("../services/WbotServices/SetChatBotOn"));
const SetChatBotOff = __importDefault(require("../services/WbotServices/SetChatBotOff"));
const SetProtocolo = __importDefault(require("../services/WbotServices/SetProtocoloAtendimento"));
const SendEmail = __importDefault(require("../services/WbotServices/SendZdgMail"));
const SendEmailAttach = __importDefault(require("../services/WbotServices/SendZdgMailAttach"));
// const GetN8NStatus = __importDefault(require("../services/WbotServices/GetN8NStatus"));
// const GetChatBotStatus = __importDefault(require("../services/WbotServices/GetChatBotStatus"));
// const GetDialogStatus = __importDefault(require("../services/WbotServices/GetDialogStatus"));
// const GetDialogAudioStatus = __importDefault(require("../services/WbotServices/GetDialogAudioStatus"));
// const GetTags = __importDefault(require("../services/WbotServices/GetTags"));
// const GetUserTags = __importDefault(require("../services/WbotServices/GetUserTags"));
// const SetUserTags = __importDefault(require("../services/WbotServices/SetUserTags"));
// const DeleteUserTags = __importDefault(require("../services/WbotServices/DeleteUserTags"));
const SendEmailUser = __importDefault(require("../services/WbotServices/SendZdgMailUser"));
const SendEmailAttachUser = __importDefault(require("../services/WbotServices/SendZdgMailAttachUser"));
const db = __importDefault(require("../helpers/GetWhatsAppId"));
const API = require('../helpers/Api');
exports.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketId } = req.params;
    const { pageNumber } = req.query;
    const { count, messages, ticket, hasMore } = yield ListMessagesService_1.default({
        pageNumber,
        ticketId
    });
    SetTicketMessagesAsRead_1.default(ticket);
    return res.json({ count, messages, ticket, hasMore });
});
// exports.index2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.params;
//     const n8nstatus = yield GetN8NStatus.default({ msgFrom });
//     return res.json(n8nstatus)
    
// });
// exports.index3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.params;
//     const chatbotstatus = yield GetChatBotStatus.default({ msgFrom });
//     return res.json(chatbotstatus)
    
// });
// exports.index4 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.params;
//     const dialogstatus = yield GetDialogStatus.default({ msgFrom });
//     return res.json(dialogstatus)
    
// });
// exports.index5 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.params;
//     const dialogAudiostatus = yield GetDialogAudioStatus.default({ msgFrom });
//     return res.json(dialogAudiostatus)
    
// });
// exports.index6 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const getTags = yield GetTags.default();
//     return res.json(getTags)
    
// });
// exports.index7 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.params;
//     const getUserTags = yield GetUserTags.default({ msgFrom });
//     return res.json(getUserTags)
    
// });
exports.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketId } = req.params;
    const { body, quotedMsg } = req.body;
    const medias = req.files;
    const ticket = yield ShowTicketService_1.default(ticketId);
    SetTicketMessagesAsRead_1.default(ticket);
    if (medias) {
        yield Promise.all(medias.map((media) => __awaiter(void 0, void 0, void 0, function* () {
            yield SendWhatsAppMedia_1.default({ media, ticket });
        })));
    }
    else {
        yield SendWhatsAppMessage_1.default({ body, ticket, quotedMsg });
    }
    return res.send();
});
exports.store2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, message, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
        yield SendWhatsAppMessage_2.default({ number, message, ticketwhatsappId });
        return res.send();
    }
});
exports.store3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield ChangeGroupTitle.default({ subject, ticketwhatsappId });
    return res.send();
    }
});
exports.store4 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield ChangeGroupDescription.default({ description, ticketwhatsappId });
    return res.send();
    }
});
exports.store5 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, contact, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield CreateGroup.default({ title, contact, ticketwhatsappId });
    return res.send();
    }
});
exports.store6 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, text, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendSMS.default({ from, to, text });
    return res.send();
    }
});
exports.store7 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, text, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield MakeVoiceCall.default({ from, to, text });
    return res.send();
    }
});
exports.store8 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, url, title, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendWhatsAppMedia_2.default({ number, url, title, ticketwhatsappId });
    return res.send();
    }
});
exports.store9 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIg, message, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendDirect.default({ userIg, message });
    return res.send();
    }
});
exports.store10 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sectionTitle, ListItem1, desc1, ListItem2, desc2, listBody, btnText, listTitle, listFooter, number, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendWhatsAppList.default({ sectionTitle, ListItem1, desc1, ListItem2, desc2, listBody, btnText, listTitle, listFooter, number, ticketwhatsappId });
    return res.send();
    }
});
exports.store11 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { btnBody, btn1, btn2, btnTitle, btnFooter, number, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendWhatsAppButton.default({ btnBody, btn1, btn2, btn3, btnTitle, btnFooter, number, ticketwhatsappId });
    return res.send();
    }
});
exports.store12 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dataEnvio, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendWhatsAppAgendamento.default({ dataEnvio, ticketwhatsappId });
    return res.send();
    }
});
exports.store13 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SyncMessage.default({ limit, ticketwhatsappId });
    return res.send();
    }
});
exports.store14 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newMessageGroup, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendWhatsAppGroup.default({ newMessageGroup, ticketwhatsappId });
    return res.send();
    }
});
exports.store15 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield CloseWhatsAppGroup.default({ ticketwhatsappId });
    return res.send();
    }
});
exports.store16 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield OpenWhatsAppGroup.default({ ticketwhatsappId });
    return res.send();
    }
});
exports.store17 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newMessAgeGroupNasa, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendWhatsAppGroupNASA.default({ newMessAgeGroupNasa, ticketwhatsappId });
    return res.send();
    }
});
exports.store18 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { msgFrom } = req.body;
    yield SetDialogFlowOn.default({ msgFrom });
    return res.send();
});
exports.store19 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { msgFrom } = req.body;
    yield SetDialogFlowOff.default({ msgFrom });
    return res.send();
});
exports.store20 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { msgFrom } = req.body;
    yield SetChatBotOn.default({ msgFrom });
    return res.send();
});
exports.store21 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { msgFrom } = req.body;
    yield SetChatBotOff.default({ msgFrom });
    return res.send();
});
exports.store22 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, protocolo } = req.body;
    yield SetProtocolo.default({ usuario, protocolo });
    return res.send();
});
exports.store23 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { msgFrom } = req.body;
    yield SetDialogFlowOnAudio.default({ msgFrom });
    return res.send();
});
exports.store24 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { msgFrom } = req.body;
    yield SetDialogFlowOffAudio.default({ msgFrom });
    return res.send();
});
exports.store25 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, limit, ticketwhatsappId } = req.body;
    yield SyncMessageUser.default({ user, limit, ticketwhatsappId });
    return res.send();
});
exports.store26 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketid } = req.body;
    const dbWpp = yield db.default(ticketid);
    return res.json({ dbWpp });
});
exports.store27 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { zdgSubject, zdgText } = req.body;
    yield SendEmail.default({ zdgSubject, zdgText });
    return res.send();
});
exports.store28 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { zdgSubject, zdgText, zdgFileName, zdgContent } = req.body;
    yield SendEmailAttach.default({ zdgSubject, zdgText, zdgFileName, zdgContent });
    return res.send();
});
// exports.store29 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.body;
//     yield SetN8NOn.default({ msgFrom });
//     return res.send();
// });
// exports.store30 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.body;
//     yield SetN8NOff.default({ msgFrom });
//     return res.send();
// });
// exports.store31 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.body;
//     yield GetUserTags.default({ msgFrom });
//     return res.send();
// });
// exports.store32 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom, tags } = req.body;
//     yield SetUserTags.default({ msgFrom, tags });
//     return res.send();
// });
// exports.store33 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     const { msgFrom } = req.body;
//     yield DeleteUserTags.default({ msgFrom });
//     return res.send();
// });
exports.store34 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, url, title, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendWhatsAppMedia_3.default({ number, url, title, ticketwhatsappId });
    return res.send();
    }
});
exports.store35 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, url, ticketwhatsappId, token } = req.body;
    const APIToken = yield API.getApiToken();
    if (APIToken !== token){
        return res.status(500).json({status: false,response: 'API INVÁLIDA'})
    }
    else {
    yield SendWhatsAppMedia_4.default({ number, url, ticketwhatsappId });
    return res.send();
    }
});
exports.store40 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { zdgSubject, zdgText, zdgTo } = req.body;
    yield SendEmailUser.default({ zdgSubject, zdgText, zdgTo });
    return res.send();
});
exports.store41 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { zdgSubject, zdgText, zdgFileName, zdgContent, zdgTo } = req.body;
    yield SendEmailAttachUser.default({ zdgSubject, zdgText, zdgFileName, zdgContent, zdgTo });
    return res.send();
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    const message = yield DeleteWhatsAppMessage_1.default(messageId);
    const io = socket_1.getIO();
    io.to(message.ticketId.toString()).emit("appMessage", {
        action: "update",
        message
    });
    return res.send();
});
