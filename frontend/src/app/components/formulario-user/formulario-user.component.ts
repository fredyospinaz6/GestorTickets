import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/interfaces/ticket';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario-user',
  templateUrl: './formulario-user.component.html',
  styleUrls: ['./formulario-user.component.css']
})
export class FormularioUserComponent implements OnInit {
  tickets: any[] = [];
  UserID: any[] = [];
    loading: boolean = false;

    id: string = '';
    title: string = '';
    description: string = '';
    priority: string = '';
    status: string = 'PENDIENTE';
    date: Date = new Date();
    userId: number = 0;
    tecnicoId: number = 0 ;
    numb: number =0;
    type: string = '';
    category: string = '';
  
    constructor(
        private toastr: ToastrService,
        public ticketService: TicketService,
        public userService: UserService,
        private router: Router,
        private _errorService: ErrorService
    ) { }

    /*ngOnInit(): void {
    }*/
    getTickets() {
      this.ticketService.getListTickets().subscribe((data: any) => {
        this.tickets = data;
      });
    }
    ngOnInit() {
      this.getTickets();
    }
 
    enviar(): void {
      
        const datosTicket: Ticket = {
            
            title: this.title,
            description: this.description,
            priority: this.priority,
            status: this.status,
            date: this.date,
            userId: this.tecnicoId,
            tecnicoId: this.tecnicoId,
            type: this.type,
            category: this.category,
         
        }
        this.loading = true;
        this.ticketService.generarTicket(datosTicket).subscribe({
          next: (v) => {
            this.loading = false;
            this.toastr.success(`El ticket ${this.title} fue registrado con exito`, 'Ticket registrado');
            this.router.navigate(['/crearticketuser']);
          },
          error: (e: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(e);
          }
        })
      
    }

    deleteTicket(id: number) {
      this.ticketService.deleteTicket(id).subscribe(() => {
        this.getTickets();
      });
    }

    actualizaTicket (){
      
    }
   // export class FormularioComponent {
      showPopup = false;
    
      openPopup() {
        this.showPopup = true;
        this.showPopup = true;
      }
    
      closePopup() {
        this.showPopup = false;
      }
      consultarUserId() {
        
        this.userService.consultarUserId().subscribe((data: any) => {
          this.UserID = data;
        });
        console.log(this.userId);
      }
}
