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
const nodemailer = require('nodemailer');
const logger_1 = require("../../utils/logger");
const getSetting = __importDefault(require("../../helpers/GetAllSettings"));
const SendZDGMail = ({zdgSubject, zdgText}) => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield getSetting.default()
    let emailUserValue = null;
    for (let setting of settings) {
        if (setting.key === 'emailUser') {
            emailUserValue = setting.value;
            break;
        }
    }
    let emailPassValue = null;
    for (let setting of settings) {
        if (setting.key === 'emailPass') {
            emailPassValue = setting.value;
            break;
        }
    }
    let emailFromValue = null;
    for (let setting of settings) {
        if (setting.key === 'emailFrom') {
            emailFromValue = setting.value;
            break;
        }
    }
    let emailToValue = null;
    for (let setting of settings) {
        if (setting.key === 'emailTo') {
            emailToValue = setting.value;
            break;
        }
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUserValue,
          pass: emailPassValue
        }
    });
    const mailOptions = {
        from: emailFromValue,
        to: emailToValue,
        subject: zdgSubject,
        text: zdgText
    };
    try {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                logger_1.logger.error('ZDG E-mail erro: ' + error);
            } else {
                logger_1.logger.info('ZDG E-mail enviado: ' + info.response);
            }
        });
    }
    catch (err) {
        throw new AppError_1.default("ERR_SENDING_EMAIL");
    }
});
exports.default = SendZDGMail;
