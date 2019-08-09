import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})

export class RequestListComponent implements OnInit {
  constructor(private requestService: RequestService, private userService: UserService, private route: ActivatedRoute) { }
  requests: any
  allUsers: any
  allRequests: any
  userId = null
  isSecurity: boolean

  getRequestDate(response) {
    var visitFromDate
    var visitToDate
    for(let i = 0; i < response.length; i++) {
      visitFromDate = new Date(response[i].visitFrom)
      visitToDate = new Date(response[i].visitTo)
      response[i].visitFrom = visitFromDate.toString().substring(0, 21)
      response[i].visitTo = visitToDate.toString().substring(0, 21)
    }
  }

  getUserRole(array) {
    for(let i = 0; i < array.length; i++) {
      if(array[i].id == this.route.snapshot.params.userId) {
        this.isSecurity = array[i].isSecurity
        console.log(this.isSecurity)
      }
    }
  }

  ngOnInit() {
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
      console.log(this.allRequests)
      this.getRequestDate(this.allRequests)
    })
  }

}
