import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/interfaces/ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketeditService } from 'src/app/services/ticketedit.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario-editar',
  templateUrl: './formulario-editar.component.html',
  styleUrls: ['./formulario-editar.component.css']
})
export class FormularioEditarComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  listTicket: Ticket[] = []
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _ticketeditService: TicketeditService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {

      this.form = this.fb.group({
        type: ['', Validators.required],
        priority: ['', Validators.required],
        category: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required]
      })
      this.id = Number(aRouter.snapshot.paramMap.get('id'));
    }

  ngOnInit(): void {

  
      // Es editar
      this.operacion = 'Editar ';
      this.getTicket(this.id);
    
  }

  getTicket(id: number) {
    this.loading = true;
    this._ticketeditService.getTicket(id).subscribe((data: any) => {
      console.log(data)
      this.loading = false;
      this.form.setValue({
        type: data.type,
        priority: data.priority,
        category: data.category,
        title: data.title,
        description: data.description,
      })
    })
  }

  addTicket() {
    /*  console.log(this.form.value.name);
     console.log(this.form.get('name')?.value); */

    const ticket: Ticket = {
      type: this.form.value.type,
      priority: this.form.value.priority,
      category: this.form.value.category,
      title: this.form.value.title,
      description: this.form.value.description,
    }
    this.loading = true;

    if (this.id !== 0) {
      // Es editar 
      ticket.id = this.id;
      this._ticketeditService.updateTicket(this.id, ticket).subscribe(() => {
        this.toastr.info(`El ticket ${ticket.title} fue actualizado con exito`, 'ticket actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      })

    } else {
      // Es agregagar
      this._ticketeditService.saveTicket(ticket).subscribe(() => {
        this.toastr.success(`El ticket ${ticket.title} fue registrado con exito`, 'ticket registrado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }




  }
}
