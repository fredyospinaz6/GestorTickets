import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/interfaces/ticket';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

    loading: boolean = false;

    id: string = '';
    title: string = '';
    description: string = '';
    priority: string = '';
    status: string = 't';
    date: string = '';
    userId: number =1;
    tecnicoId: number =1 ;
    type: string = '';
    category: string = '';
  
    constructor(
        private toastr: ToastrService,
        public ticketService: TicketService,
        private router: Router,
        private _errorService: ErrorService
    ) { }

    ngOnInit(): void {
    }

    enviar(): void {
        // Validamos campos llenos
        if ( this.title == '' || this.description == '' || this.priority == '' || this.status == ''
        || this.date == '' || this.type == '' || this.category == '') {
            this.toastr.error('Todos los campos son obligatorios', 'Error');
            return;

        }
        // Creamos el Ticket
        const datosTicket: Ticket = {
            
            title: this.title,
            description: this.description,
            priority: this.priority,
            status: this.status,
            date: this.date,
            userId: this.userId,
            tecnicoId: this.tecnicoId,
            type: this.type,
            category: this.category,
         
        }
        this.loading = true;
        this.ticketService.generarTicket(datosTicket).subscribe({
          next: (v) => {
            this.loading = false;
            this.toastr.success(`El ticket ${this.title} fue registrado con exito`, 'Ticket registrado');
            this.router.navigate(['/crearticket']);
          },
          error: (e: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(e);
          }
        })
      
    }


}
