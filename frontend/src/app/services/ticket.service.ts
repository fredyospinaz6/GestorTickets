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
  
    constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint;
      this.myApiUrl = 'api/tickets'
     }
  
     generarTicket(ticket: Ticket): Observable<any> {
      return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, ticket);
     }
    }