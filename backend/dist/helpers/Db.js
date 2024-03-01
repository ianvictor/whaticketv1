const mysql = require('mysql2/promise');

function delay(t, v) {
	return new Promise(function(resolve) { 
		setTimeout(resolve.bind(null, v), t)
	});
}

const createConnection = async () => {
	return await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});
}

const getReply = async (keyword) => {
	return false;
}

const getAgendamento = async (dataEnvio) => {
	return false;
}

const setAgendamento = async (id) => {
	return false;
}

const getChatBot = async (msgFrom) => {
	return false;
}

const setChatBotOff = async (msgFrom) => {
	return false;
}

const setChatBotOn = async (msgFrom) => {
	return false;
}

const getDialogFlowAudio = async (msgFrom) => {
	return false;
}

const setDialogOffAudio = async (msgFrom) => {
	return false;
}

const setDialogOnAudio = async (msgFrom) => {
	return false;
}

const getDialogFlow = async (msgFrom) => {
	return false;
}

const setDialogOff = async (msgFrom) => {
	return false;
}

const setDialogOn = async (msgFrom) => {
	return false;
}

const setContactDialog = async (msgFrom) => {
	return false;
}

const getContactDialog = async (msgFrom) => {
	return false;
}

const getHorarioInicio = async () => {
	return false;
}

const getHorarioTermino = async () => {
	return false;
}

const getLimiteUsuario = async () => {
	return false;
}

const getLimiteWhatsApp = async () => {
	return false;
}

const setProtocolo = async (usuario, protocolo) => {
	return false;
}

const getWhatsAppId = async (ticketid) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT whatsappId FROM Tickets WHERE id = ?', [ticketid]);
	delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return rows;
	return false;
}

const getContactId = async (msgFrom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT id FROM Contacts WHERE number = ?', [msgFrom]);
	delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return rows[0].id;
	return false;
}

const setTicketClosed = async (id) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE Tickets SET status = "closed" WHERE contactId = ?', [id]);
	delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return rows;
	return false;
}

const deleteAllContacts = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('DELETE FROM `Contacts`');
	delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
		});
	});
	if (rows.length > 0) return rows;
	return false;
}

const getAllContacts = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM Contacts');
	delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
		});
	});
	if (rows.length > 0) return rows;
	return false;
}

const setAllTicketClosed = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('UPDATE Tickets SET status = "closed" WHERE status <> "closed"');
	delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
		});
	});
	if (rows.length > 0) return rows;
	return false;
}

const getAllSettings = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM Settings');
	delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
		});
	});
	if (rows.length > 0) return rows;
	return false;
}

module.exports = {
	createConnection,
	getReply,
	getAgendamento,
	setAgendamento,
	getDialogFlow,
	setDialogOff,
	setDialogOn,
	getDialogFlowAudio,
	setDialogOffAudio,
	setDialogOnAudio,
	setContactDialog,
	getContactDialog,
	getChatBot,
	setChatBotOn,
	setChatBotOff,
	getHorarioInicio,
	getHorarioTermino,
	getLimiteUsuario,
	getLimiteWhatsApp,
	setProtocolo,
	getWhatsAppId,
	getContactId,
	setTicketClosed,
	setAllTicketClosed,
	deleteAllContacts,
	getAllContacts,
	getAllSettings
}