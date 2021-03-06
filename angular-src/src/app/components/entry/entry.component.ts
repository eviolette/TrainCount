import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  lineHeader: String;
  trainHeader: String;
  paramHeader: String;
  lineNum: Number;
  lineCoachNum: String;
  coachIndex: String = "";

  departures: Array<String> = [];
  stations: Array<String> = [];
  oncounts: Array<Number> = [];
  offcounts: Array<Number> = [];
  comments: Array<String> = [];
  netons: Array<Number> = [];
  netoffs: Array<Number> = [];
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

    // Formats incoming route parameters into usable line, trainnumber, and coachindex

    this.route.params.subscribe(params => {
      this.paramHeader = params['id'];
      this.lineHeader = "Line " + params['id'].substring(0,2);
      this.trainHeader = "Train Number " + params['id'].substring(3,7);
      this.lineNum = this.lineNumDeformatter(params['id'].substring(3,7));
      this.coachIndex = params['id'].substring(8,10);
    });

    // Calls the Authentication Service's checkNumberOfCars to return if the current coach index is larger than the number of cars

    this.authService.checkNumberOfCars(this.paramHeader.substring(0,7)).subscribe((res) => {
      //console.log(res.numCars);
      if (res.numCars < this.lineNumDeformatter(this.coachIndex)) {
        alert('Warning: Number of Cars is Listed as ' + res.numCars);
      }
    });


    // Gets departure times from the authentication service, sends in line and train number
    this.authService.getDeptInfo(this.paramHeader.substring(0,2) + this.lineNum)
      .subscribe((res) => {
      // If the train is found, populate the table with the response's departure times
        if (res.success) {
          this.depart_times = res.times;
          this.numTimes = Object.keys(this.depart_times).length;
          for (let i in this.depart_times) {
            // Fill table iff the response's departure time is not an empty time
            if (this.depart_times[i] != "-") this.departures.push(this.depart_times[i]);
          }
          //console.log(this.depart_times);
          //console.log(this.departures);
        } else {
          // Wrong train, navigate back to home
          alert('Train Not Found');
          this.router.navigate(['/home']);
        }
      });

    // Gets station times from the authentication service, sends in line and train number
    this.authService.getStationInfo(this.paramHeader.substring(0,2) + this.lineNum)
      .subscribe((res) => {
        // If the train is found, populate the table with the response's station times
      if (res.success) {
        this.station_times = res.stations;
        this.numStations = Object.keys(this.station_times).length;
        for (let i in this.station_times) {
          //if (this.depart_times && this.depart_times[i] != "-") was used before the next line
           this.stations.push(this.station_times[i]);
           this.authService.findTrainCoach(this.paramHeader).subscribe((res) => {
             if (res.success) {
               //Finds the coach by calling the authentication service's findTrainCoach(), then populates On Offs
              // console.log('pass');
               if (this.stations[i]) {
                 // Calls AuthService Method getOnOffCounts, string => [Numbers]
                 // Passes formatted station names and train information, populates onoff counts if they exist in the database
                 this.authService.getOnOffCounts(this.paramHeader + this.stations[i].replace(/\//g, '%2F').replace(/,/g, '%2C')).subscribe((res) => {
                   if (res.success) {
                     this.oncounts[i] = res.onCount;
                     //console.log(this.oncounts);
                     this.offcounts[i] = res.offCount;
                     this.comments[i] = res.comments;
                     //console.log(res.comments);
                     this.stationcodes[i] = res.stationCode;
                    // console.log(this.stationcodes);
                   }
                 })
               }
             } else {
               // Train does not exist yet in the database, instead just populate onoffs with 0 values
                 if (this.stations[i]) {
                   this.authService.getOnOffCounts(this.paramHeader.substring(0, 7) + "_01" + this.stations[i].replace(/\//g, '%2F').replace(/,/g, '%2C')).subscribe((res) => {
                     if (res.success) {
                       this.oncounts[i] = 0;
                      // console.log(this.oncounts);
                       this.offcounts[i] = 0;
                       this.stationcodes[i] = res.stationCode;
                   //    console.log(this.stationcodes);
                     }
                   })
                 }
               }
           });

        }
      //  console.log(this.station_times);
      }
      });


  }

  // String => Number
  // Formats Line Number to a readable Integer

  lineNumDeformatter(str) {
    if (str.charAt(0) === "0") return +str.substring(1);
    return +str;
  }
  // Increments the coach index
  coachIndexAdd(str) {
    if (str.charAt(0) === "0" && str.charAt(1) === "9") {
      return "10";
    } else if (str.charAt(0) === "0" && str.charAt(1) != "9") {
      let num = +str.charAt(1);
      num++;
      return "0" + num;
    } else {
      let num = +str;
      num++;
      return "" + num;
    }
  }

  // Decrements the coach index

  coachIndexSub(str) {
    if (str === "10") {
      return "09";
    } else if (str.charAt(0) === "0") {
      let num = +str.charAt(1);
      num--;
      return "0" + num;
    } else {
      let num = +str;
      num--;
      return "" + num;
    }
  }

  // Iterates through the onoff arrays to check if any entry's difference with the previous entry is less than 0

  checkNetCounts() {
    this.netons[0] = +this.oncounts[0];
    this.netoffs[0] = +this.offcounts[0];
    for (let i = 1; i < this.departures.length; i++) {
      this.netons[i] = +this.oncounts[i] - +this.oncounts[i - 1];
      this.netoffs[i] = +this.offcounts[i] - +this.offcounts[i - 1];
      if (this.netons[i] < 0) {
        alert('Error: Net On Count is Less than 0 at ' + this.stations[i]);
        return false;
      }
      if (this.netoffs[i] < 0) {
        alert('Error: Net Off Count is Less than 0 at ' + this.stations[i]);
        return false;
      }
  //    console.log('No err');
    }
    return true;

  }

  // Navigates to the previous car

  getPreviousCar() {
    if(+this.coachIndex == 1) {
      alert("No Previous Car");
    } else {
      this.router.navigate(['/dummy', this.paramHeader.substring(0,7) + "_" + this.coachIndexSub(this.coachIndex)]);
    }
  }

  // Navigates to the next car

  getNextCar() {
    this.router.navigate(['/dummy', this.paramHeader.substring(0,7) + "_" + this.coachIndexAdd(this.coachIndex)]);
  }

  // Submit Button is clicked

  onCountSubmit() {
    //console.log(this.stationcodes);

    if (this.checkNetCounts()) {

      // For every departure, create a count object

      for (let i = 0; i < this.departures.length; i++) {
        const count = {
          trainStationCoachIndex: this.paramHeader.substring(0, 7) + "_" + this.stationcodes[i] + "_" + this.paramHeader.substring(8,10),
          trainIndex: this.paramHeader.substring(0, 7),
          stationCode: this.stationcodes[i],
          stationName: this.stations[i],
          stationTime: this.departures[i],
          trainCoachIndex: this.paramHeader,
          onCount: this.oncounts[i],
          offCount: this.offcounts[i],
          comments: this.comments[i]
        };
        //console.log(count);

        if (typeof this.comments[i] == 'undefined') count.comments = '';
   //     console.log(count.comments);

        if (!(count.stationTime == '-' || count.onCount == null || count.offCount == null)) {

          // Calls the authService method updateCount to post this count to the database
          this.authService.updateCount(count).subscribe();

        }
      }
    }
  }

  // Finished button is clicked, navigate back to home

  finished() {
    this.router.navigate(['/home']);
  }



}
