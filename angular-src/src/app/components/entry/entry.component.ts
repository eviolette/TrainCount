import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  header: String;
  paramHeader: String;
  lineNum: Number;
  coachIndex: String = "01";

  numTimes: Number;
  numStations: Number;

  dept1: String ;
  station1: String;
  on1: Number;
  off1: Number;
  comments1: String;

  dept2: String ;
  station2: String;
  on2: Number;
  off2: Number;
  comments2: String;

  dept3: String ;
  station3: String;
  on3: Number;
  off3: Number;
  comments3: String;

  car_num: Number;
  depart_times: Object;
  station_times: Object;


  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.car_num = 10;

    this.route.params.subscribe(params => {
      this.paramHeader = params['id'];
      this.header = "For Train Number " + params['id'].substring(3,7);
      this.lineNum = this.lineNumDeformatter(params['id'].substring(3,7));
    });

    this.authService.getDeptInfo(this.lineNum)
      .subscribe((res) => {
        this.depart_times = res.times;
        this.numTimes = Object.keys(this.depart_times).length;
        this.dept1 = this.depart_times[0];
        this.dept2 = this.depart_times[1];
        this.dept3 = this.depart_times[2];
        console.log(this.depart_times);
      });

    this.authService.getStationInfo(this.lineNum)
      .subscribe((res) => {
        this.station_times = res.stations;
        this.numTimes = Object.keys(this.station_times).length;
        this.station1 = this.station_times[0];
        this.station2 = this.station_times[1];
        this.station3 = this.station_times[2];
        console.log(this.station_times);
      });

    //console.log(this.depart_times);

  }

  lineNumDeformatter(str) {
    if (str.charAt(0) === "0") return +str.substring(1);
    return +str;
  }

  onCountSubmit() {

    const count1 = {
      trainStationCoachIndex : this.paramHeader.substring(0,7) + "_" + this.getStationString(this.station1) + this.paramHeader.substring(7),
      trainIndex : this.paramHeader.substring(0,7),
      stationCode : this.getStationString(this.station1),
      stationName : this.station1,
      stationTime : this.dept1,
      trainCoachIndex : this.paramHeader,
      onCount : this.on1,
      offCount : this.off1,
      comments1 : this.comments1
    };

    alert('updating');
    this.authService.updateCount(count1).subscribe();
  }

  getStationString(station) {
    return 13000
    /*
    var key = "potato";
    this.authService.getStationKey(station).subscribe(
        function(data) {
          key = data.stationCode;
          console.log('Current val: ' + key);
        },
        function(err) {
          console.log(err);
        }
    );
    console.log(key);
    return key;
     */
  }


}
