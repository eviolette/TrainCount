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
  lineCoachNum: String;
  coachIndex: String = "01";

  departures: Array<String> = [];
  stations: Array<String> = [];
  oncounts: Array<Number> = [];
  offcounts: Array<Number> = [];
  comments: Array<String> = [];
  stationcodes: Array<String> = [];


  numTimes: Number;
  numStations: Number;

  car_num: Number;
  depart_times: Object;
  station_times: Object;
  station_keys: Object;


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
        if (res.success) {
          this.depart_times = res.times;
          this.numTimes = Object.keys(this.depart_times).length;
          for (let i in this.depart_times) {
            this.departures.push(this.depart_times[i]);
          }
          //console.log(this.depart_times);
          console.log(this.departures);
        } else {
          alert('Train Not Found');
          this.router.navigate(['/home']);
        }
      });

    this.authService.getStationInfo(this.lineNum)
      .subscribe((res) => {
      if (res.success) {
        this.station_times = res.stations;
        this.numStations = Object.keys(this.station_times).length;
        for (let i in this.station_times) {
          this.stations.push(this.station_times[i]);
        }
        console.log(this.station_times);
      }
      });

  }

  lineNumDeformatter(str) {
    if (str.charAt(0) === "0") return +str.substring(1);
    return +str;
  }

  onCountSubmit() {

    for (let i in this.departures) {
      const count = {
        //trainStationCoachIndex: this.paramHeader.substring(0, 7) + "_" + this.getStationString(i) + this.paramHeader.substring(10),
        //trainIndex: this.paramHeader.substring(0, 7),
        //stationCode: this.getStationString(this.stations[i]),
        stationName: this.stations[i],
        stationTime: this.departures[i],
        trainCoachIndex: this.paramHeader,
        onCount: this.oncounts[i],
        offCount: this.offcounts[i],
        comments: this.comments[i]
      };

      if (typeof this.comments[i] == 'undefined') count.comments = '';
      console.log(count.comments);

      if (!(count.stationTime == '-' || count.onCount == null || count.offCount == null)) {
        console.log(JSON.stringify(count));
        this.authService.updateCount(count).subscribe();
        this.router.navigate(['/home']);
      }
    }
  }



}
