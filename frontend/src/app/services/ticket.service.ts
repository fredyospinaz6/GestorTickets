import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../interfaces/ticket';

@Injectable({
    providedIn: 'root'
})

export class TicketService {
    private myAppUrl: string;
    private myApiUrl: string;
    private apiUrl = 'http://localhost:3306/api/tickets'; // URL de la API

    constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint;
      this.myApiUrl = 'api/tickets'
     }
     getTickets() {
        return this.http.get(`${this.apiUrl}`);
      }
      getTicket(id: number) {
        return this.http.get(`${this.apiUrl}/${id}`);
      }  
     generarTicket(ticket: Ticket): Observable<any> {
      return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, ticket);
     }
     updateTicket(id: number, ticket: any) {
        return this.http.put(`${this.apiUrl}/${id}`, ticket);
      }
    
      deleteTicket(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
      }
    }