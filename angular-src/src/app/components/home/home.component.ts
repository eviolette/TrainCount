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
  // Instantiating variables

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

  // Passing imports through constructor

  constructor(private router: Router,
              private authService: AuthService,
              private validateService: ValidateService) { }

  ngOnInit() {
  }

  // Submit Button is clicked

  onLineSubmit() {

    // Creates JSON object for a line by getting the form data

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

    // Calls validateservice.checkCounterId to query the database to check if counter id and names match, warn if not

    this.validateService.checkCounterId(line.counter_id + "_" + line.counter_name).subscribe((res) => {
      if (!res.success) {
        alert(res.msg);
      }
    });
    if (this.validateLine(line)) {

      // Calls validateService.checkTrainNumber with the line number and train number pair to see if this combination
      // exists, if not, do not allow validation, if so, navigate to the entry page by passing the this linePair as a
      // routing param

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

  // String => String
  // Formats train number based on entered number

  trainNumFormatter(trainnum) {
    if (trainnum.length == 3) {
      return "0" + trainnum;
    } else if (trainnum.length == 2) {
      return "00" + trainnum;
    } else if (trainnum.length == 1) {
      return "000" + trainnum;
    } else {
      return trainnum + "";
    }
  }

  // Number => String
  // Formats assigned car based on entered number

  assignedCarFormatter(car) {
    if (car < 10) return "0" + car;
    return car;
  }

  // Various form validations based on type errors, empty fields, etc.

  validateLine(line) {
    const linePair = line.train_line + "_" + line.train_num;

    if(line.train_num.length > 4) {
      alert('Train Number is too long');
      return false;
    }

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
