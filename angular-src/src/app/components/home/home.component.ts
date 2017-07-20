import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date: String;
  counter_name: String;
  counter_id: Number;
  assigned_car: String;
  serial_num: Number;
  train_line: String;
  num_cars: Number;
  dept_time: String;
  arrival_time: String;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLineSubmit() {
    const line = {
      date: this.date,
      counter_name: this.counter_name,
      counter_id: this.counter_id,
      assigned_car: this.assigned_car,
      serial_num: this.serial_num,
      train_line: this.train_line,
      num_cars: this.num_cars,
      dept_time: this.dept_time,
      arrival_time: this.arrival_time
    };

    this.authService.registerLine(line).subscribe(data => {
      if(data.success) {
        alert('Line is now registered.');
        this.router.navigate(['/entry', line.serial_num]);
      } else {
        alert('Line Registration failed');
      }
    })
  }


}
