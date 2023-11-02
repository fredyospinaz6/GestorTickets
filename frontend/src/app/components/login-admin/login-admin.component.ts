import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userAdmin } from 'src/app/interfaces/userAdmin';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  username: string ='';
  password: string ='';
 /* name: string = '';
  lastname: string = '';
  role: string = '';*/
  loading: boolean = false;


  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }
  
  loginAdm() {

    // Validamos que el usuario ingrese datos
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

      // Creamos el body  || Se pone userAdmin en const para evitar duplicidad con login
    const userAdmin: userAdmin = {
      username: this.username,
      password: this.password
    }
    
    if(this.username =='admin' && this.password == 'admin123' ){
      this.router.navigate(['/dashboard-admin']);
    }
  }

}
