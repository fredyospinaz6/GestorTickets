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

  //  id: string = '';
    title: string = '';
    description: string = '';
    priority: string = '';
    status: string = '';
    date: string = '';
    userId: string = '';
    tecnicoId: string = '';
    type: string = '';
    category: string = '';
    //createdAt: string = '';
    //updatedAt: string = '';

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
        /*if ( this.title == '' || this.description == '' || this.priority == '' || this.status == ''
        || this.date == '' || this.userId == '' || this.tecnicoId == '' || this.type == '' || this.category == ''
         || this.createdAt == '' || this.updatedA == '') {
            this.toastr.error('Todos los campos son obligatorios', 'Error');
            return;

        }*/
        // Creamos el Ticket
        const datosTicket: Ticket = {
            
            title: this.title,
            description: this.description,
            priority: this.priority,
            status: "t",
            date: this.date,
            userId: parseInt("7") ,
            tecnicoId: parseInt("7"),
            type: this.type,
            category: this.category
            //createdAt: this.createdAt,
            //updatedAt: this.updatedAt
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
