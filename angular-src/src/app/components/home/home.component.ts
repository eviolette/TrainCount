import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

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
  linePair: String;

  constructor(private router: Router,
              private authService: AuthService,
              private validateService: ValidateService) { }

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
      train_num: this.trainNumFormatter(this.train_num),
      num_cars: this.num_cars,
      dept_time: this.dept_time,
      arrival_time: this.arrival_time
    };

    this.idStr = line.train_line + "_" + line.train_num + "_" + this.assignedCarFormatter(line.assigned_car);
    this.linePair = line.train_line + "_" + line.train_num;

     if (this.validateLine(line)) {
       //console.log("pass");
       this.validateService.checkTrainNumber(this.linePair).subscribe(data => {
         if (!data.success) {
           alert('Train Line and Train Number Combination Not Found');
         } else {
           //alert('returning true');
           this.authService.registerLine(line).subscribe(data => {
             if (data.success) {
               //alert('Line is now registered.');
               this.router.navigate(['/entry', this.idStr]);
             } else {
               alert('Line Validation failed');
             }
           })
         }
       });

    }


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

  assignedCarFormatter(car) {
    if (car < 10) return "0" + car;
    return car;
  }

  validateLine(line) {
    const linePair = line.train_line + "_" + line.train_num;

    if (typeof line.date == "undefined") {
      alert('Enter a Date');
      return false;
    }
    if (typeof line.counter_id != "number") {
      alert('Use a valid number for the Counter Id');
      return false;
    }
    if (typeof line.serial_num != 'number') {
      alert('Use a valid number for the Car Serial Number');
      return false;
    }
    if (typeof line.dept_time == "undefined") {
      alert('Enter a Departure Time');
      return false;
    }
    if (typeof line.arrival_time == "undefined") {
      alert('Enter an Arrival Time');
      return false;
    }
    if (typeof  line.assigned_car != 'number' || line.assigned_car < 1 || line.assigned_car > 13) {
      alert('Assigned Car must be a number, between 1 and 13');
      return false;
    }
    return true;
  }


}
