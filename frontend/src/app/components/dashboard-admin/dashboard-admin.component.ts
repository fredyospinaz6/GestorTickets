import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']

})
export class DashboardAdminComponent {
  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
/*export class DashboardAdminComponent  {
  showPopup = false;

  /*constructor() { }

 /* implements OnInit
  ngOnInit(): void {
  }

  openPopup() {
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
  }


*/


}