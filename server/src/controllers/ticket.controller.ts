import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.model';

export const getTickets = async (req: Request, res: Response) => {
    const listTickets = await Ticket.findAll();

    res.json(listTickets)
}
