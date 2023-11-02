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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTicket = exports.getTickets = void 0;
const ticket_model_1 = require("../models/ticket.model");
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTickets = yield ticket_model_1.Ticket.findAll();
    res.json(listTickets);
});
exports.getTickets = getTickets;
const newTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority, status, date, userId, tecnicoId, type, category } = req.body;
    //createdAt, updatedAt
    // Validamos si el usuario ya existe en la base de datos
    const ticket = yield ticket_model_1.Ticket.findOne({ where: { title: title } });
    if (ticket) {
        return res.status(400).json({
            msg: `Ya existe un ticket con el nombre ${title}`
        });
    }
    try {
        // Guardarmos ticket en la base de datos
        yield ticket_model_1.Ticket.create({
            //id: id,
            title: title,
            description: description,
            priority: priority,
            status: status,
            date: date,
            userId: userId,
            tecnicoId: tecnicoId,
            type: type,
            category: category,
            //createdAt: createdAt,
            //updatedAt: updatedAt
        });
        res.json({
            msg: `Ticket ${title} creado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        });
    }
});
exports.newTicket = newTicket;
