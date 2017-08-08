import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URLTrainRaw = 'http://localhost:3000/trains/uploadtrainraw';
const URLCounters = 'http://localhost:3000/counters/uploadcounters';
const URLUsers = 'http://localhost:3000/usernames/uploadusers';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

    private uploader: FileUploader = new FileUploader({url: URLTrainRaw, itemAlias: 'trainraw'});
    private uploader2: FileUploader = new FileUploader({url: URLCounters, itemAlias: 'counters'});
    private uploader3: FileUploader = new FileUploader({url: URLUsers, itemAlias: 'userlist'});

    show: boolean = false;

    constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(
      profile => {
        this.authService.isAdmin(profile.user.username).subscribe((res) => {
          console.log(res);
          if (res.success) {
            this.show = true;
          } else {
            this.show = false;}
        })
      },
      err => {
        console.log(err);
        return false;
      }
    );

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader2.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader3.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
    this.uploader2.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload2:uploaded:", item, status, response);
    };
    this.uploader3.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload3:uploaded:", item, status, response);
    };
  }

}