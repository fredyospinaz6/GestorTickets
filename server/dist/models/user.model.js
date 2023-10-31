"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const ticket_model_1 = require("./ticket.model");
exports.User = connection_1.default.define('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
});
exports.User.hasMany(ticket_model_1.Ticket, { as: 'TicketCreados', foreignKey: 'userId' });
exports.User.hasMany(ticket_model_1.Ticket, { as: 'TicketAsignados', foreignKey: 'tecnicoId' }); // Define la relación uno a muchos
