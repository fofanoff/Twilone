const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
require('dotenv').config();

const port = process.env.TWILONE_PORT;

const sequelize = new Sequelize({
  host: process.env.TWILONE_DB_HOST,
  port: process.env.TWILONE_DB_PORT,
  username: process.env.TWILONE_DB_USER,
  password: process.env.TWILONE_DB_PASSWORD,
  database: process.env.TWILONE_DB_NAME,
  dialect: process.env.TWILONE_DB_DIALECT
});

const Twit = sequelize.define('twit', {
	'message' : {
		'type' : Sequelize.STRING,
		'allowNull' : false
	}
});

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (_, response) => {
	Twit.findAll().then(results => {
	  	response.render('index', { 'twits' : results });
	}).catch(error => {
		console.log(error);
		response.status(500).end();
	});
});

app.post('/', (request, response) => {
	Twit.create({ 'message' : request.body.message }).then(() => {
	  	response.redirect('/');
	}).catch(error => {
		console.log(error);
		response.status(500).end();
	});
});

sequelize.sync().then(() => {
	app.listen(port, () => console.log(`Twilone is listening on port ${port}.`));
});
