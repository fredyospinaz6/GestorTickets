import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/interfaces/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listTickets: Ticket[] = []
  loading: boolean = false;
  userRole: string = '';
  dato: any;
  constructor(private _ticketService: TicketService, private toastr: ToastrService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.dato = this.route.snapshot.paramMap.get('idRole');
    console.log(this.dato)
    this.getListtickest(this.dato);
  }

  getListtickest(id : number) {
    this.loading = true;

    this._ticketService.getTicketstecnico(id).subscribe((data: any) => {
      this.listTickets = data;
      this.loading = false;
    })
  }

  deleteTicket(id: number) {
    this.loading = true;
    this._ticketService.deleteTicket(id).subscribe(() => {
      this.getListtickest(id);
      this.toastr.warning('El ticket fue eliminado con exito', 'ticket eliminado');
    })
  }
  actualizarEstado(id: number) {
    this.dato = this.route.snapshot.paramMap.get('idRole');
    this._ticketService.actualizarEstado(id).subscribe(() => {
      this.getListtickest(this.dato);
    });
  }
  mostrarBoton = true;

}
