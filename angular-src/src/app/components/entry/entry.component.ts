import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  header: String;
  lineNum: Number;
  dept1: String;
  station1: String;
  on1: Number;
  off1: Number;
  comments1: String;
  car_num: Number;

  deptArr: Array<String>;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.car_num = 10;

    this.route.params.subscribe(params => {
      this.header = "For Car Number " + params['id'];
      this.lineNum = params['id'];
    });

    this.authService.getRowInfo(this.lineNum).subscribe(
      function(data) {
        alert('data received');
        this.deptArr = data.rows;
        console.log(deptArr);
      },
      function(err) {
        console.log(err);
      }
    );
    //this.dept1 = this.rows.toString();

  }

  onCountSubmit() {
    const count = {
      car_num : this.car_num,
      on1 : this.on1,
      off1 : this.off1,
      comments1 : this.comments1
    };

    this.authService.updateCount(count)
  }

}
