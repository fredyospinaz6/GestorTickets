import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  name: string = '';
  lastname: string = '';
  role: string = '';
  userRole: string= '';
  userIds: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  login() {

    // Validamos que el usuario ingrese datos // 
    if (this.username == '' || this.password == '' ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }
   
    // Creamos el usuario
    const user: User = {
      username: this.username,
      password: this.password,
      name: this.name,
      lastname: this.lastname,
      role: this.role
    }

   
      this.loading = true;
      this._userService.login(user).subscribe((data: any) => {
        this.userRole = data;
        console.log(this.userRole);
        if (this.userRole[0] == 'tecnico'){
          this.router.navigate([`/dashboard/${this.userRole[1]}`])
        }else if (this.userRole == 'user'){
          this.router.navigate(['/crearticket'])
        }
        
      });

      /*this._userService.login(user).subscribe({
        if (userRole == 'tecnico') {
          this.router.navigate(['/dashboard'])
        }

        next: (token) => {
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard'])
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
          this.loading = false
        }
      })*/
  }

}
