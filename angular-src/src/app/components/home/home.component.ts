import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras} from '@angular/router';
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
  serial_num: String;
  train_line: String;
  train_num: String;
  num_cars: Number;
  dept_time: String;
  arrival_time: String;
  idStr: String = "";

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLineSubmit() {
    alert(this.date);

    const line = {
      date: this.date,
      counter_name: this.counter_name,
      counter_id: this.counter_id,
      assigned_car: this.assigned_car,
      serial_num: this.serial_num,
      train_line: this.train_line,
      train_num: this.trainNumFormatter(this.train_num),
      num_cars: this.num_cars,
      dept_time: this.dept_time,
      arrival_time: this.arrival_time
    };

    this.idStr += line.train_line + "_" + line.train_num + "_" + "01";

    this.authService.registerLine(line).subscribe(data => {
      if(data.success) {
        alert('Line is now registered.');
        this.router.navigate(['/entry', this.idStr]);
      } else {
        alert('Line Registration failed');
      }
    })


  }

  trainNumFormatter(trainnum) {
    if (trainnum.length == 3) {
      return "0" + trainnum;
    } else if (trainnum.length == 2) {
      return "00" + trainnum;
    } else {
      return trainnum;
    }
  }

  findLineKey(line) {

  }


}
