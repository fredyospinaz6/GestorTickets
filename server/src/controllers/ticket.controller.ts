import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.model';
import { User } from '../models/user.model';

export const getTickets = async (req: Request, res: Response) => {
    const listTickets = await Ticket.findAll();

    res.json(listTickets)
}

export const consultarUserId = async (req: Request, res: Response) => {
    const userId = await User.findAll( {where: { role: 'tecnico' }, attributes: ['id'] });

    res.json(userId)
}
export const newTicket = async (req: Request, res: Response) => {
    const {  title, description, priority, status, date, userId, tecnicoId, type, category, createdAt, updatedAt  } = req.body;
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
            createdAt: createdAt,
            updatedAt: updatedAt
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
export const getTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
        res.json(ticket)
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
}

export const deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
        res.status(404).json({
            msg: `No existe un ticket con el id ${id}`
        })
    } else {
        await ticket.destroy();
        res.json({
            msg: 'El ticket fue eliminado con exito!'
        })
    }

}

export const postTicket = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Ticket.create(body);

        res.json({
            msg: `El ticket fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateTicket = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const ticket = await Ticket.findByPk(id);

    if(ticket) {
        await ticket.update(body);
        res.json({
            msg: 'El ticket fue actualziado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe un ticket con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
}


