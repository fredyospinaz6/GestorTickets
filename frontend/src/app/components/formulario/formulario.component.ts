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

    tipo: string = '';
    prioridad: string = '';
    categoria: string = '';
    titulo: string = '';
    detalle: string = '';
    fecha: string = '';
    loading: boolean = false;

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
        if (this.tipo == '' || this.prioridad == '' || this.categoria == '' || this.titulo == '' || this.detalle == '' || this.fecha == '') {
            this.toastr.error('Todos los campos son obligatorios', 'Error');
            return;
        }
        // Creamos el Ticket
        const datosTicket: Ticket = {
            tipo: this.tipo,
            categoria: this.categoria,
            detalle: this.detalle,
            prioridad: this.prioridad,
            titulo: this.titulo,
            fecha: this.fecha
        }
        this.loading = true;
        this.ticketService.generarTicket(datosTicket).subscribe({
          next: (v) => {
            this.loading = false;
            this.toastr.success(`El ticket ${this.titulo} fue registrado con exito`, 'Usuario registrado');
            this.router.navigate(['/crearticket']);
          },
          error: (e: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(e);
          }
        })
       // this.Ticket.enviar(datosTicket).subscribe({
       //     next: (token) => {
       //         localStorage.setItem('token', token);
       //         this.router.navigate(['/dashboard'])
       //     },
        
       // })


    }


}
