import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})

export class RequestListComponent implements OnInit {
  constructor(private requestService: RequestService, private userService: UserService, private route: ActivatedRoute, private registrationService: RegistrationService) { }
  requests: any
  allUsers: any
  allRequests: any
  userId = null
  isSecurity: boolean
  registrationWithoutCheckout: any
  interval: any
  hour: any
  mins: any
  sec: any

  paginationLength = 0
  pageSizeOptions: number[] = [5, 10, 25, 100];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  checkFontColor(status: string): string {
    if (status === "Expected") {
      return "orange"
    }
    if (status === "On-Site") {
      return "green"
    }
    if (status === "Cancelled") {
      return "red"
    }

    return "blue"
  }

//   startTimer(checkInTime) {
//     var oneHour = 60 * 60 * 1000;
//     var oneMin = 60 * 1000;
//     this.hour = Math.floor((new Date().getTime() - new Date(checkInTime).getTime()) / oneHour)
//     this.mins = Math.floor((new Date().getTime() - new Date(checkInTime).getTime()) / oneMin - this.hour * 60)
//     this.sec = new Date().getSeconds()
// ​
//     setInterval(() => {
//       if (this.sec < 59) {
//         this.sec++;
//       } else {
//         this.sec = 0;
//         if (this.mins < 59) {
//           this.mins += 1;
//         }
//         else {
//           this.mins = 0
//           this.hour += 1
//         }
//       }
//     }, 1000)
//     return this.sec
//   }

  getRequestDate(response) {
    var visitFromDate
    var visitToDate
    for (let i = 0; i < response.length; i++) {
      visitFromDate = new Date(response[i].visitFrom)
      visitToDate = new Date(response[i].visitTo)
      response[i].visitFrom = visitFromDate.toString().substring(0, 21)
      response[i].visitTo = visitToDate.toString().substring(0, 21)
    }
  }

  getExpectedCheckoutTime(response) {
    var expectedCheckOut

    for(let i = 0; i < response.length; i++) {
      expectedCheckOut = new Date(response[i].visitTo)
      response[i].visitTo = expectedCheckOut.toString().substring(16, 21)
    }
  }

  getCheckInTime(registrationArray, requestArray) {
    var checkInTime
    var duration

    for(let i = 0; i < registrationArray.length; i++) {
      checkInTime = new Date(registrationArray[i].checkinAt).toString().substring(16, 21)
      requestArray[i]["checkinAt"] = checkInTime
      // var hour = this.startTimer(registrationArray[i].checkinAt).hour
      // var mins = this.startTimer(registrationArray[i].checkinAt).mins
      // if(this.startTimer(registrationArray[i].checkinAt).sec != null) {
      //   var sec = this.startTimer(registrationArray[i].checkinAt).sec
      //   console.log(sec)
      //   requestArray[i]["sec"] = sec
      // }
    }

    console.log(requestArray)
  }

  getUserRole(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == this.route.snapshot.params.userId) {
        this.isSecurity = array[i].isSecurity
        console.log(this.isSecurity)
      }
    }
  }

  getAllNullCheckoutRegistration() {
    this.registrationService.getAllNullCheckoutRegistration().subscribe(response => {
      this.registrationWithoutCheckout = response
      console.log(this.registrationWithoutCheckout)
      this.getCheckInTime(this.registrationWithoutCheckout.registrations, this.registrationWithoutCheckout.request)
      this.getExpectedCheckoutTime(this.registrationWithoutCheckout.request)
    })
  }

  ngOnInit() {
    pageEvent: PageEvent;
    
    this.requestService.getUserRequests(this.route.snapshot.params.userId).subscribe(response => {
      this.requests = response
      this.userId = this.route.snapshot.params.userId
      console.log(this.requests)
      this.getRequestDate(this.requests)
    })

    this.userService.getUsers().subscribe(response => {
      this.allUsers = response                                                                                                                                                
      console.log(this.allUsers)
      this.getUserRole(this.allUsers)
    })

    this.requestService.getAllRequests().subscribe((requests) => {
      this.allRequests = requests
      this.paginationLength = this.allRequests.length
      this.getRequestDate(this.allRequests)
    })

    this.getAllNullCheckoutRegistration()

  }

}
