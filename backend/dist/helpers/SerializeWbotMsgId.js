"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerializeWbotMsgId = (ticket, message) => {
    let ifGroup = 'g.us_' + message.id + '_' + message.contact.number + '@c.us';
    let ifPrivate = 'c.us_' + message.id;
    const serializedMsgId = `${message.fromMe}_${ticket.contact.number}@${ticket.isGroup ? ifGroup : ifPrivate}`;
    return serializedMsgId;
};
exports.default = SerializeWbotMsgId;