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
exports.removeWbot = exports.getWbot = exports.initWbot = void 0;
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const socket_1 = require("./socket");
const AppError_1 = __importDefault(require("../errors/AppError"));
const logger_1 = require("../utils/logger");
const wbotMessageListener_1 = require("../services/WbotServices/wbotMessageListener");
const getSetting = __importDefault(require("../helpers/GetAllSettings"));
const sessions = [];

// TypeBOT
const axios_1 = require("axios");
const fs_1 = require("fs");
const path_1 = require("path");
const { MessageMedia } = require("whatsapp-web.js");
const dirBot = './public/typebot';
if (!fs_1.existsSync(dirBot)){
    fs_1.mkdirSync(dirBot)
}

const syncUnreadMessages = (wbot) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield wbot.getChats();
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */
    for (const chat of chats) {
        if (chat.unreadCount > 0) {
            const unreadMessages = yield chat.fetchMessages({
                limit: chat.unreadCount
            });
            for (const msg of unreadMessages) {
                yield wbotMessageListener_1.handleMessage(msg, wbot);
            }
            yield chat.sendSeen();
        }
    }
});
exports.initWbot = (whatsapp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            const io = socket_1.getIO();
            const sessionName = whatsapp.name;
            let sessionCfg;
            if (whatsapp && whatsapp.session) {
                sessionCfg = JSON.parse(whatsapp.session);
            }
            const wbot = new whatsapp_web_js_1.Client({
                session: sessionCfg,
                authStrategy: new whatsapp_web_js_1.LocalAuth({ clientId: 'bd_' + whatsapp.id }),
                puppeteer: {
                    //          headless: false,
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    executablePath: process.env.CHROME_BIN || undefined
                },
            });
            wbot.initialize();
            wbot.on("qr", (qr) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info("Session:", sessionName);
                qrcode_terminal_1.default.generate(qr, { small: true });
                yield whatsapp.update({ qrcode: qr, status: "qrcode", retries: 0 });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
            }));
            wbot.on("authenticated", (session) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session: ${sessionName} AUTHENTICATED`);
                //        await whatsapp.update({
                //          session: JSON.stringify(session)
                //        });
            }));
            wbot.on("auth_failure", (msg) => __awaiter(void 0, void 0, void 0, function* () {
                console.error(`Session: ${sessionName} AUTHENTICATION FAILURE! Reason: ${msg}`);
                if (whatsapp.retries > 1) {
                    yield whatsapp.update({ session: "", retries: 0 });
                }
                const retry = whatsapp.retries;
                yield whatsapp.update({
                    status: "DISCONNECTED",
                    retries: retry + 1
                });
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
                reject(new Error("Error starting whatsapp session."));
            }));
            wbot.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session: ${sessionName} READY`);
                yield whatsapp.update({
                    status: "CONNECTED",
                    qrcode: "",
                    retries: 0
                });
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                wbot.sendPresenceAvailable();
                yield syncUnreadMessages(wbot);
                resolve(wbot);
            }));
            // wbot typebot
            wbot.on('message', async msg => {
                const settings = await getSetting.default()
                let typebotValue = null;
                for (let setting of settings) {
                    if (setting.key === 'typebot') {
                        typebotValue = setting.value;
                        break;
                    }
                }
                let typebotUrlValue = null;
                for (let setting of settings) {
                    if (setting.key === 'typebotUrl') {
                        typebotUrlValue = setting.value;
                        break;
                    }
                }
                let typebotNameValue = null;
                for (let setting of settings) {
                    if (setting.key === 'typebotName') {
                        typebotNameValue = setting.value;
                        break;
                    }
                }
                let typebotRestartValue = null;
                for (let setting of settings) {
                    if (setting.key === 'typebotRestart') {
                        typebotRestartValue = setting.value;
                        break;
                    }
                }
                let typebotOffValue = null;
                for (let setting of settings) {
                    if (setting.key === 'typebotOff') {
                        typebotOffValue = setting.value;
                        break;
                    }
                }
                let typebotTimeValue = null;
                for (let setting of settings) {
                    if (setting.key === 'typebotTime') {
                        typebotTimeValue = setting.value;
                        break;
                    }
                }
                const typebot = typebotNameValue;
                const url = typebotUrlValue;
                function delay(t, v) {
                    return new Promise(function(resolve) { 
                        setTimeout(resolve.bind(null, v), t)
                    });
                }
                const timer = ms => new Promise(res => setTimeout(res, ms))
                function randomIntFromInterval(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min)
                }
                async function downloadImageAndGetName(url) {
                    try {
                      const response = await axios_1.get(url, { responseType: 'arraybuffer' });
                      const buffer = Buffer.from(response.data);
                  
                      // Importação dinâmica corrigida
                      const { fileTypeFromBuffer } = await import('file-type');
                      const fileTypeResult = await fileTypeFromBuffer(buffer);
                  
                      if (!fileTypeResult) {
                        throw new Error('Não foi possível determinar o tipo do arquivo.');
                      }
                  
                      const ext = fileTypeResult.ext;
                      const timestamp = Date.now();
                      const fileName = `typebot_${timestamp}.${ext}`;
                      const imagePath = path_1.join(__dirname, '..', '..', 'public', 'typebot', fileName);
                  
                      fs_1.writeFileSync(imagePath, buffer);
                      console.log(`Download da imagem concluído. Salvo como: ${fileName}`);
                      
                      return fileName;
                    } catch (error) {
                      console.error('Erro ao baixar a imagem:', error);
                      return null;
                    }
                  }
                  
                  
                  
                const rndInt = randomIntFromInterval(1, 3)
                async function deleteDirectory(dirPath) {
                    if (fs_1.existsSync(dirPath)) {
                        const files = fs_1.readdirSync(dirPath);
                        files.forEach((file) => {
                        const filePath = path_1.join(dirPath, file);
                        if (fs_1.statSync(filePath).isDirectory()) {
                            deleteDirectory(filePath);
                        } else {
                            fs_1.unlinkSync(filePath);
                        }
                        });
                        try {
                            fs_1.rmdirSync(dirPath);
                        logger_1.logger.info(`BOT-ZDG: Diretório ${dirPath} deletado com sucesso.`);
                        } catch (error) {
                            logger_1.logger.info(`BOT-ZDG: : Erro ao deletar diretório ${dirPath}:`, error);
                        }
                    } else {
                        logger_1.logger.info(`BOT-ZDG: : O diretório ${dirPath} não existe.`);
                    }
                }
                async function readWriteFileJsonSessionId(sessionId, from) {
                    let dataFile = [];
                    fs_1.writeFileSync("./public/typebot/" + from + "/typebot.json", JSON.stringify(dataFile));
                    var data = fs_1.readFileSync("./public/typebot/" + from + "/typebot.json");
                    var myObject = JSON.parse(data);
                    let newData = {
                        id: sessionId,
                    };
                    await myObject.push(newData);
                    fs_1.writeFileSync("./public/typebot/" + from + "/typebot.json", JSON.stringify(myObject));
                }
                async function readWriteFileJsonStatus(status, from) {
                    let dataFile = [];
                    fs_1.writeFileSync("./public/typebot/" + from + "/status.json", JSON.stringify(dataFile));
                    var data = fs_1.readFileSync("./public/typebot/" + from + "/status.json");
                    var myObject = JSON.parse(data);
                    let newData = {
                        status: status,
                    };
                    await myObject.push(newData);
                    fs_1.writeFileSync("./public/typebot/" + from + "/status.json", JSON.stringify(myObject));
                }
                async function createSession(data){
                    let dataTypebot = JSON.stringify({
                        prefilledVariables: {
                          number: data.from.split('@')[0],
                          name: data.name || data.pushname || data.notifyName
                        },
                    });
                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: `${url}/api/v1/typebots/${typebot}/startChat`,
                        headers: { 
                          'Content-Type': 'application/json', 
                          'Accept': 'application/json'
                        },
                        // data : dataTypebot
                    };
                    const response = await axios_1.request(config);
                    logger_1.logger.info('BOT-ZDG: CreateSession' + response.data)
                        const dirFrom = './public/typebot/' + data.from.replace(/\D/g,'');
                        if (!fs_1.existsSync(dirFrom)){
                            fs_1.mkdirSync(dirFrom);
                          await readWriteFileJsonSessionId(response.data.sessionId, data.from.replace(/\D/g,''));
                        }
                        await readWriteFileJsonStatus("on", msg.from.replace(/\D/g,''))
                    return response.data
                }
                async function continueSession(data, msg){
                    let dataMessage = JSON.stringify({
                      "message": msg
                    });
                  
                    let config = {
                      method: 'post',
                      maxBodyLength: Infinity,
                      url: `${url}/api/v1/sessions/${data}/continueChat`,
                      headers: { 
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                      },
                      data : dataMessage
                    };
                  
                    const response = await axios_1.request(config);
                    logger_1.logger.info('BOT-ZDG: ContinueSession', response.data)
                    return response.data
                }
                const dirFrom = './public/typebot/' + msg.from.replace(/\D/g,'');
                if (!fs_1.existsSync(dirFrom)){
                    const session = await createSession(msg);
                    const messages = session.messages
                    for (const message of messages){
                      if (message.type === 'text') {
                        let formattedText = '';
                        for (const richText of message.content.richText){
                          for (const element of richText.children){
                            let text = '';
                            if (element.type === 'inline-variable') {
                                for (const child of element.children) {
                                  for (const grandChild of child.children) {
                                    text += grandChild.text;
                                  }
                                }
                              } else if (element.text) {
                                text = element.text;
                              }
                            if (element.bold) {
                                text = `*${text}*`;
                            }
                            if (element.italic) {
                                text = `_${text}_`;
                            }
                            if (element.underline) {
                                text = `~${text}~`;
                            }
                            formattedText += text;          
                          }
                          formattedText += '\n';
                        }
                        formattedText = formattedText.replace(/\n$/, '');
                        await wbot.sendMessage(msg.from, formattedText);
                        await timer(rndInt * 1000)
                      }
                      if (message.type === 'image' || message.type === 'video') {
                        try{
                            downloadImageAndGetName(message.content.url)
                            .then(async fileName => {
                            if (fileName) {
                            const media = MessageMedia.fromFilePath("./public/typebot/" + fileName)
                            await wbot.sendMessage(msg.from, media, {caption: ' '})
                            await timer(rndInt * 1000)
                            } else {
                            console.log('Falha ao baixar a imagem.');
                            }
                            });                            
                        }catch(e){}
                      }
                      if (message.type === 'audio') {
                        try{
                            downloadImageAndGetName(message.content.url)
                            .then(async fileName => {
                            if (fileName) {
                            const media = MessageMedia.fromFilePath("./public/typebot/" + fileName)
                            await wbot.sendMessage(msg.from, media, {sendAudioAsVoice: true})
                            await timer(rndInt * 1000)
                            } else {
                            console.log('Falha ao baixar a imagem.');
                            }
                            });                            
                        }catch(e){}
                      }
                    }
                    const input = session.input
                    if (input) {
                      if (input.type === 'choice input') {
                        let formattedText = '';
                        const items = input.items;
                        for (const item of items) {
                          formattedText += `▶️ ${item.content}\n`;
                        }
                        formattedText = formattedText.replace(/\n$/, '');
                        await wbot.sendMessage(msg.from, formattedText);
                        await timer(rndInt * 1000)
                      }
                    }                    
                }
                else {
                    delay(2000).then(async function() {
                    wbot.sendPresenceAvailable();
                    const from = msg.from.replace(/\D/g,'');
                    const typebotStatus = fs_1.readFileSync("./public/typebot/" + from + "/status.json","utf8").split(':')[1].replace(/\W/g, '');
                    try {
                        if(msg.body === typebotOffValue) {
                            await readWriteFileJsonStatus("off", msg.from.replace(/\D/g,''))
                            logger_1.logger.info('BOT-ZDG: Typebot desligado para o usuário' + msg.from + '  pelo gatilho da palavra: ' + msg.body)
                            delay(typebotTimeValue).then(async function() {
                                await readWriteFileJsonStatus("on", msg.from.replace(/\D/g,''))
                                const typebotTime = parseInt(typebotTimeValue);
                                const segundos = typebotTime / 1000; 
                                logger_1.logger.info('BOT-ZDG: Typebot religado para o usuário' + msg.from + ' pelo tempo: ' + segundos + ' segundos.')
                            })
                            return;
                        }
                    } catch(e){
                        logger_1.logger.info('BOT-ZDG: Typebot não desligado pelo gatilho da palavra: ' + msg.body)
                    }
                    console.log(typebotValue)
                    if (typebotValue === "disabled") return;
                    try {
                        if (typebotValue === "enabled") {
                            logger_1.logger.info("BOT-ZDG: ENV Config TypeBot On")
                            // if (horaAtual >= 10){
                                // if (atual > inicioAtendimento && atual < terminoAtendimento){
                                    if(typebotStatus === "on"){
                                        delay(1000).then(async function() {
                                            if (msg.body !== typebotRestartValue) {
                                                const jsonSplit = fs_1.readFileSync("./public/typebot/" + from + "/typebot.json","utf8").split(':')[1];
                                                if (jsonSplit === undefined || jsonSplit === null){
                                                    logger_1.logger.info("BOT-ZDG: Sessão Typebot não existe");
                                                    await deleteDirectory(dirFrom);
                                                    logger_1.logger.info("BOT-ZDG: Criando nova sessão");
                                                    const session = await createSession(msg);
                                                    const messages = session.messages
                                                    for (const message of messages){
                                                    if (message.type === 'text') {
                                                        let formattedText = '';
                                                        for (const richText of message.content.richText){
                                                        for (const element of richText.children){
                                                            let text = '';
                                                            if (element.type === 'inline-variable') {
                                                                for (const child of element.children) {
                                                                  for (const grandChild of child.children) {
                                                                    text += grandChild.text;
                                                                  }
                                                                }
                                                              } else if (element.text) {
                                                                text = element.text;
                                                              }
                                                            if (element.bold) {
                                                                text = `*${text}*`;
                                                            }
                                                            if (element.italic) {
                                                                text = `_${text}_`;
                                                            }
                                                            if (element.underline) {
                                                                text = `~${text}~`;
                                                            }
                                                            formattedText += text;          
                                                        }
                                                        formattedText += '\n';
                                                        }
                                                        formattedText = formattedText.replace(/\n$/, '');
                                                        await wbot.sendMessage(msg.from, formattedText);
                                                        await timer(rndInt * 1000)
                                                    }
                                                    if (message.type === 'image' || message.type === 'video') {
                                                        try{
                                                            downloadImageAndGetName(message.content.url)
                                                            .then(async fileName => {
                                                            if (fileName) {
                                                            const media = MessageMedia.fromFilePath("./public/typebot/" + fileName)
                                                            await wbot.sendMessage(msg.from, media, {caption: ' '})
                                                            await timer(rndInt * 1000)
                                                            } else {
                                                            console.log('Falha ao baixar a imagem.');
                                                            }
                                                            }); 
                                                        }catch(e){}
                                                    }
                                                    if (message.type === 'audio') {
                                                        try{
                                                            downloadImageAndGetName(message.content.url)
                                                            .then(async fileName => {
                                                            if (fileName) {
                                                            const media = MessageMedia.fromFilePath("./public/typebot/" + fileName)
                                                            await wbot.sendMessage(msg.from, media, {sendAudioAsVoice: true})
                                                            await timer(rndInt * 1000)
                                                            } else {
                                                            console.log('Falha ao baixar a imagem.');
                                                            }
                                                            });                                                              
                                                        }catch(e){}
                                                    }
                                                    }
                                                    const input = session.input
                                                    if (input) {
                                                    if (input.type === 'choice input') {
                                                        let formattedText = '';
                                                        const items = input.items;
                                                        for (const item of items) {
                                                        formattedText += `▶️ ${item.content}\n`;
                                                        }
                                                        formattedText = formattedText.replace(/\n$/, '');
                                                        await wbot.sendMessage(msg.from, formattedText);
                                                        await timer(rndInt * 1000)
                                                    }
                                                    }                                                
                                                }
                                                else {
                                                    const sessionId = jsonSplit.replace(/\W/g, '');
                                                    if (sessionId === "") {
                                                        logger_1.logger.info("BOT-ZDG: Sessão Typebot não existe");
                                                        await deleteDirectory(dirFrom);
                                                        logger_1.logger.info("BOT-ZDG: Criando nova sessão");
                                                        const session = await createSession(msg);
                                                        const messages = session.messages
                                                        for (const message of messages){
                                                        if (message.type === 'text') {
                                                            let formattedText = '';
                                                            for (const richText of message.content.richText){
                                                            for (const element of richText.children){
                                                                let text = '';
                                                                if (element.type === 'inline-variable') {
                                                                    for (const child of element.children) {
                                                                      for (const grandChild of child.children) {
                                                                        text += grandChild.text;
                                                                      }
                                                                    }
                                                                  } else if (element.text) {
                                                                    text = element.text;
                                                                  }
                                                                if (element.bold) {
                                                                    text = `*${text}*`;
                                                                }
                                                                if (element.italic) {
                                                                    text = `_${text}_`;
                                                                }
                                                                if (element.underline) {
                                                                    text = `~${text}~`;
                                                                }
                                                                formattedText += text;          
                                                            }
                                                            formattedText += '\n';
                                                            }
                                                            formattedText = formattedText.replace(/\n$/, '');
                                                            await wbot.sendMessage(msg.from, formattedText);
                                                            await timer(rndInt * 1000)
                                                        }
                                                        if (message.type === 'image' || message.type === 'video') {
                                                            try{
                                                                downloadImageAndGetName(message.content.url)
                                                                .then(async fileName => {
                                                                if (fileName) {
                                                                const media = MessageMedia.fromFilePath("./public/typebot/" + fileName)
                                                                await wbot.sendMessage(msg.from, media, {caption: ' '})
                                                                await timer(rndInt * 1000)
                                                                } else {
                                                                console.log('Falha ao baixar a imagem.');
                                                                }
                                                                }); 
                                                            }catch(e){}
                                                        }
                                                        if (message.type === 'audio') {
                                                            try{
                                                                downloadImageAndGetName(message.content.url)
                                                                .then(async fileName => {
                                                                if (fileName) {
                                                                const media = MessageMedia.fromFilePath("./public/typebot/" + fileName)
                                                                await wbot.sendMessage(msg.from, media, {sendAudioAsVoice: true})
                                                                await timer(rndInt * 1000)
                                                                } else {
                                                                console.log('Falha ao baixar a imagem.');
                                                                }
                                                                });                                                                
                                                            }catch(e){}
                                                        }
                                                        }
                                                        const input = session.input
                                                        if (input) {
                                                        if (input.type === 'choice input') {
                                                            let formattedText = '';
                                                            const items = input.items;
                                                            for (const item of items) {
                                                            formattedText += `▶️ ${item.content}\n`;
                                                            }
                                                            formattedText = formattedText.replace(/\n$/, '');
                                                            await wbot.sendMessage(msg.from, formattedText);
                                                            await timer(rndInt * 1000)
                                                        }
                                                        }                                                    
                                                    }  else {
                                                        const from = msg.from.replace(/\D/g,'');
                                                        const sessionId = fs_1.readFileSync("./public/typebot/" + from + "/typebot.json","utf8").split(':')[1].replace(/\W/g, '');
                                                        const session = await continueSession(sessionId, msg.body);
                                                        const messages = session.messages
                                                        for (const message of messages){
                                                            if (message.type === 'text') {
                                                            let formattedText = '';
                                                            for (const richText of message.content.richText){
                                                                console.log(richText)
                                                                for (const element of richText.children){
                                                                let text = '';
                                                                if (element.type === 'inline-variable') {
                                                                    for (const child of element.children) {
                                                                      for (const grandChild of child.children) {
                                                                        text += grandChild.text;
                                                                      }
                                                                    }
                                                                } else if (element.text) {
                                                                    text = element.text;
                                                                }
                                                                if (element.bold) {
                                                                    text = `*${text}*`;
                                                                }
                                                                if (element.italic) {
                                                                    text = `_${text}_`;
                                                                }
                                                                if (element.underline) {
                                                                    text = `~${text}~`;
                                                                }
                                                                formattedText += text;          
                                                                }
                                                                formattedText += '\n';
                                                            }
                                                            formattedText = formattedText.replace(/\n$/, '');
                                                            await wbot.sendMessage(msg.from, formattedText);
                                                            await timer(rndInt * 1000)
                                                            }
                                                            if (message.type === 'image' || message.type === 'video') {
                                                            try{
                                                                downloadImageAndGetName(message.content.url)
                                                                .then(async fileName => {
                                                                if (fileName) {
                                                                const media = MessageMedia.fromFilePath("./public/typebot/" + fileName)
                                                                await wbot.sendMessage(msg.from, media, {caption: ' '})
                                                                await timer(rndInt * 1000)
                                                                } else {
                                                                console.log('Falha ao baixar a imagem.');
                                                                }
                                                                });
                                                            }catch(e){}
                                                            }
                                                            if (message.type === 'audio') {
                                                            try{
                                                                downloadImageAndGetName(message.content.url)
                                                                .then(async fileName => {
                                                                if (fileName) {
                                                                const media = MessageMedia.fromFilePath("./public/typebot/" + fileName)
                                                                await wbot.sendMessage(msg.from, media, {sendAudioAsVoice: true})
                                                                await timer(rndInt * 1000)
                                                                } else {
                                                                console.log('Falha ao baixar a imagem.');
                                                                }
                                                                });
                                                            }catch(e){}
                                                            }
                                                        }
                                                        console.log(session.input)
                                                        const input = session.input
                                                        if (input) {
                                                            if (input.type === 'choice input') {
                                                            let formattedText = '';
                                                            const items = input.items;
                                                            for (const item of items) {
                                                                formattedText += `▶️ ${item.content}\n`;
                                                            }
                                                            formattedText = formattedText.replace(/\n$/, '');
                                                            await wbot.sendMessage(msg.from, formattedText);
                                                            await timer(rndInt * 1000)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if ((msg.body === typebotRestartValue)) {
                                                await deleteDirectory(dirFrom)
                                                await wbot.sendMessage(msg.from, 'Atendimento automático reiniciado.')
                                                await timer(rndInt * 1000)
                                            }                                 
                                        });
                                        logger_1.logger.info("BOT-ZDG: Config TypeBOT ON ");
                                    }
                                    if (typebotStatus === "off"){
                                        logger_1.logger.info("BOT-ZDG: Config TypeBOT OFF");
                                    }
                                // }
                            // }
                        }
                        else {
                            logger_1.logger.info('BOT-ZDG: ENV TypeBot OFF')
                        }
                    } catch(e){}
                    });
                }
            });   
        }
        catch (err) {
            logger_1.logger.error(err);
        }
    });
});
exports.getWbot = (whatsappId) => {
    const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
    if (sessionIndex === -1) {
        throw new AppError_1.default("ERR_WAPP_NOT_INITIALIZED");
    }
    return sessions[sessionIndex];
};
exports.removeWbot = (whatsappId) => {
    try {
        const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
        if (sessionIndex !== -1) {
            sessions[sessionIndex].destroy();
            sessions.splice(sessionIndex, 1);
        }
    }
    catch (err) {
        logger_1.logger.error(err);
    }
};
