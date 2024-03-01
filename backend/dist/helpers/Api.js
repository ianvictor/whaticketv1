const mysql = require('mysql2/promise');

const createConnection = async () => {
	return await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});
}

function delay(t, v) {
	return new Promise(function(resolve) { 
		setTimeout(resolve.bind(null, v), t)
	});
}

const getApiToken = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM Settings WHERE `key` = "userApiToken"');
	delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return rows[0].value;
	return false;
}

module.exports = {
	createConnection,
	getApiToken
}