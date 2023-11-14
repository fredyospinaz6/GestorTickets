
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/interfaces/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit {
  listTickets: Ticket[] = []
  loading: boolean = false;



  constructor(private _ticketService: TicketService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListtickest();
  }

  getListtickest() {
    this.loading = true;

    this._ticketService.getListTickets().subscribe((data: Ticket[]) => {
      this.listTickets = data;
      this.loading = false;
    })
  }

  deleteTicket(id: number) {
    this.loading = true;
    this._ticketService.deleteTicket(id).subscribe(() => {
      this.getListtickest();
      this.toastr.warning('El ticket fue eliminado con exito', 'ticket eliminado');
    })
  }

  /*updateTicket(id:number) {
    this._ticketService.updateTicket(id).subscribe(
      response => {
        console.log('Los cambios se guardaron correctamente');
      },
      error => {
        console.error('Ocurrió un error al guardar los cambios:', error);
        
      }
    );
}*/


}