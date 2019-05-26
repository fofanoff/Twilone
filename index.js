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

const User = sequelize.define('user', {
	'login' : {
		'type' : Sequelize.STRING,
		'allowNull' : false,
		'unique' : true
	},
	'password' : {
		'type' : Sequelize.STRING,
		'allowNull' : false
	},
	'admin' : {
		'type' : Sequelize.BOOLEAN,
		'allowNull' : false,
		'defaultValue' : false
	}
});

const Twit = sequelize.define('twit', {
	'message' : {
		'type' : Sequelize.STRING,
		'allowNull' : false
	}
});

User.hasMany(Twit);
Twit.belongsTo(User);

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
	User.upsert({
		'login' : process.env.TWILONE_ADMIN_LOGIN,
		'password' : process.env.TWILONE_ADMIN_PASSWORD,
		'admin' : true
	}).then(() => {
 		app.listen(port, () => console.log(`Twilone is listening on port ${port}.`));
	});
});