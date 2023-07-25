const Sequelize = require('sequelize');
const { databaseOptions } = require('./src/config/config');

const db = new Sequelize(databaseOptions);

module.exports = { db, Sequelize }