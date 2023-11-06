import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../interfaces/ticket';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})

export class TicketService {
    private myAppUrl: string;
    private myApiUrl: string;
  
    constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint;
      this.myApiUrl = 'api/tickets/'
    }
  
    generarTicket(ticket: Ticket): Observable<any> {
        return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, ticket);
    }
    getListTickets(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
     
    deleteTicket(id: number): Observable<void> {
        return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
     
    saveTicket(ticket: Ticket ): Observable<void> {
        return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,ticket)
    }
     
    getTicket(id: number): Observable<Ticket> {
        return this.http.get<Ticket>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
     
    updateTicket (id: number, ticket: Ticket ): Observable<void> {
        return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, ticket);
    }
    /*consultarUserId (): Observable<User[]> {
      return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }*/

}