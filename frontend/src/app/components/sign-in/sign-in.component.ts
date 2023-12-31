import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
//import { UsersService } from 'path/to/usersService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
  users: any[] = [];
  username: string = '';
  password: string = '';
  name: string = '';
  lastname: string = '';
  role: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
    //private usersService: UsersService
    ) { }

    getUsers() {
      this._userService.getUsers().subscribe((data: any) => {
        this.users = data;
      });
    }

    ngOnInit() {
      this.getUsers();
    }

  addUser() {

    // Validamos que el usuario ingrese valores
    if (this.username == '' || this.password == '' || this.confirmPassword == '' || this.name == '' || this.lastname == '' || this.role == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      this.getUsers();
      return;
    }

    // Validamos que las password sean iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password,
      name: this.name,
      lastname: this.lastname,
      role: this.role,

    }

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }

    
    })
  }
  updateUser(id: number, user: any) {
    this._userService.updateUser(id, user).subscribe(() => {
      this.getUsers();
    });
  }
  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }
}
