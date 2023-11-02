import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.model';

export const getTickets = async (req: Request, res: Response) => {
    const listTickets = await Ticket.findAll();

    res.json(listTickets)
}
export const newTicket = async (req: Request, res: Response) => {
    const {  title, description, priority, status, date, userId, tecnicoId, type, category  } = req.body;
    //createdAt, updatedAt
    // Validamos si el usuario ya existe en la base de datos
    const ticket = await Ticket.findOne({ where: { title: title } });

    if(ticket) {
       return res.status(400).json({
            msg: `Ya existe un ticket con el nombre ${title}`
        })
    
 } 

    try {
        // Guardarmos ticket en la base de datos
        await Ticket.create({
            //id: id,
            title: title,
            description:description,
            priority: priority,
            status: status,
            date: date,
            userId: userId,
            tecnicoId: tecnicoId,
            type: type,
            category: category,
            //createdAt: createdAt,
            //updatedAt: updatedAt
        })
    
        res.json({
            msg: `Ticket ${title} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}


