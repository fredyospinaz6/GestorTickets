"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('mesaServicio', 'root', 'admin123', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});
exports.default = sequelize;
