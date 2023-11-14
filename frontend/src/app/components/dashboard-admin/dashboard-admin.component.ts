import { Component } from '@angular/core';
import * as FileSaver from 'file-saver';

import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']

})
export class DashboardAdminComponent {

  constructor(private ticketService: TicketService) {}

  generateTextReport() {

    //... obtener datos
  
    let blob = new Blob([], {type: 'text/plain'});
  
    FileSaver.saveAs(blob, 'report.txt');
  
  }
  
  




}