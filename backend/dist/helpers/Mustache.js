"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hour = exports.date = exports.control = exports.msgsd = void 0;
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-array-constructor */
const mustache_1 = __importDefault(require("mustache"));
const msgsd = () => {
    let ms = "";
    const hh = new Date().getHours();
    if (hh >= 6) {
        ms = "Bom Dia";
    }
    if (hh > 11) {
        ms = "Boa Tarde";
    }
    if (hh > 17) {
        ms = "Boa Noite";
    }
    if (hh > 23 || hh < 6) {
        ms = "Boa Madrugada";
    }
    return ms;
};
exports.msgsd = msgsd;
const date = () => {
    const Hr = new Date();
    const dd = ("0" + Hr.getDate()).slice(-2);
    const mm = ("0" + (Hr.getMonth() + 1)).slice(-2);
    const yy = Hr.getFullYear().toString();
    const dates = dd + "-" + mm + "-" + yy;
    return dates;
};
exports.date = date;
const hour = () => {
    const Hr = new Date();
    const hh = Hr.getHours();
    const min = ("0" + Hr.getMinutes()).slice(-2);
    const ss = ("0" + Hr.getSeconds()).slice(-2);
    const hours = hh + ":" + min + ":" + ss;
    return hours;
};
exports.hour = hour;
exports.default = (body, ticket) => {
    var _a;
    const view = {
        name: ticket?.name ?? ticket?.contact?.name ?? "",
        user: ticket.user ? ticket.user.dataValues.name : "",
        ticket_id: ticket ? ticket.id : "",
        ms: (0, exports.msgsd)(),
        hour: (0, exports.hour)(),
        date: (0, exports.date)(),
        connection: ticket.whatsapp ? ticket.whatsapp.dataValues.name : "",
        queue: ticket.queue ? ticket.queue.dataValues.name : ""
    };
    return mustache_1.default.render(body, view);
};
