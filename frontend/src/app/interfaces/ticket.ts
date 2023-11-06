export interface Ticket {
    id?: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    date: Date;
    userId: number;
    tecnicoId: number;
    type: string;
    category: string;

}