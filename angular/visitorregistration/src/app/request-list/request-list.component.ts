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
  checkInTime = null

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
      this.getRequestDate(this.registrationWithoutCheckout.request)
      for(let i = 0; i < this.registrationWithoutCheckout.registrations.length; i++) {
        this.checkInTime = new Date(this.registrationWithoutCheckout.registrations[i].checkinAt).toString().substring(16, 21)
      }
      console.log(this.checkInTime)
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
