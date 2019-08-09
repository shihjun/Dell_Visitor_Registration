import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }
  requests: any
  requestInfo: any
  userId = null
  visitFromDate = null
  visitToDate = null

  getUserInfo() {
    this.requestService.getRequest(this.route.snapshot.params.requestId).subscribe(response => {
      this.requestInfo = response
      console.log(this.requestInfo)
      this.visitFromDate = new Date(this.requestInfo.request.visitFrom).toString().substring(0, 21)
      this.visitToDate = new Date(this.requestInfo.request.visitTo).toString().substring(0, 21)
      console.log(this.visitFromDate)
      console.log(this.visitToDate)
    })
  }

  openDialog() {
    this.dialog.open(CancelRequestSuccessAlert)
  }

  cancelUserRequest(){
    var currentDate = new Date()

    const data = {
      updatedAt: currentDate
    }

    this.requestService.cancelRequest(this.route.snapshot.params.requestId, data).subscribe(response => {
      this.openDialog()
      this.router.navigate(["/user/" + this.userId + "/requests"])
    })
  }

  ngOnInit() {
    this.requestService.getUserRequests(this.route.snapshot.params.userId).subscribe(response => {
      this.requests = response
      this.userId = this.route.snapshot.params.userId
    })
    this.getUserInfo()
    
  }

}

@Component({
  selector: 'cancel-request-success-alert',
  templateUrl: './cancel-request-success-alert.html'
})
export class CancelRequestSuccessAlert {}