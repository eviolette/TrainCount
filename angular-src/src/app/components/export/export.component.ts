import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  exportCounts() {
    this.authService.exportCounts().subscribe(data => {
       // console.log(data);
      }
    );
  }
}
