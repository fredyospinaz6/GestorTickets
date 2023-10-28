import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/interfaces/ticket';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

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

    constructor(
        private toastr: ToastrService,
        public Ticket: TicketService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    enviar(): void {
        // Validamos que el usuario ingrese valores
        if (this.tipo == '' || this.prioridad == '' || this.categoria == '' || this.titulo == '' || this.detalle == '') {
            this.toastr.error('Todos los campos son obligatorios', 'Error');
            return;
        }
        // Creamos el Ticket
        const datosTicket: Ticket = {
            tipo: this.tipo,
            categoria: this.categoria,
            detalle: this.detalle,
            prioridad: this.prioridad,
            titulo: this.titulo
        }
       // this.Ticket.enviar(datosTicket).subscribe({
       //     next: (token) => {
       //         localStorage.setItem('token', token);
       //         this.router.navigate(['/dashboard'])
       //     },
        
       // })


    }


}
