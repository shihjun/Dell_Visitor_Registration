import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from '../request.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

export interface DialogData {
  userId: any;
  requestId: any;
}

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  constructor(private requestService: RequestService, private route: ActivatedRoute, private userService: UserService, public dialog: MatDialog) { }
  requests: any
  requestInfo: any
  allUsers: any
  userId = null
  visitFromDate = null
  visitToDate = null
  registrationDates: any = []
  totalVisitDay = null
  isSecurity = null

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

  openConfirmationDialog() {
    this.dialog.open(CancelRequestConfirmation, {
      data: { userId: this.userId, requestId: this.requestInfo.request.id }
    })
  }

  getRequestInfo() {
    this.requestService.getRequest(this.route.snapshot.params.requestId).subscribe(response => {
      this.requestInfo = response
      console.log(this.requestInfo)
      this.visitFromDate = new Date(this.requestInfo.request.visitFrom).toString().substring(0, 21)
      this.visitToDate = new Date(this.requestInfo.request.visitTo).toString().substring(0, 21)
      console.log(this.visitFromDate)
      console.log(this.visitToDate)

      var oneDay = 24 * 60 * 60 * 1000;
      var NumOfDays = Math.round(Math.abs((new Date(this.visitToDate.substring(0, 15)).getTime() - new Date(this.visitFromDate.substring(0, 15)).getTime()) / oneDay) + 1);
      console.log("NumOfDays: " + NumOfDays)
      this.totalVisitDay = NumOfDays

      for (let i = 0; i < NumOfDays; i++) {
        var registrationDate = new Date(new Date(this.requestInfo.request.visitFrom).getTime() + (oneDay * i)).toString().substring(0, 15);
        this.registrationDates[i] = registrationDate
        // console.log("registrationDate: " + registrationDate)
      }
      // console.log(this.registrationDates)
    })
  }

  getUser() {
    this.userService.getUsers().subscribe(response => {
      this.allUsers = response
      console.log(this.allUsers)
      this.getUserRole(this.allUsers);
    })
  }

  getUserRole(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == this.route.snapshot.params.userId) {
        this.isSecurity = array[i].isSecurity
        console.log(this.isSecurity)
      }
    }
  }


  ngOnInit() {
    this.requestService.getUserRequests(this.route.snapshot.params.userId).subscribe(response => {
      this.requests = response
      this.userId = this.route.snapshot.params.userId
    })
    this.getRequestInfo()
    this.getUser()
  }

}

@Component({
  selector: 'cancel-request-success-alert',
  templateUrl: './cancel-request-success-alert.html'
})
export class CancelRequestSuccessAlert { }

@Component({
  selector: 'cancel-request-confirmation',
  templateUrl: './cancel-request-confirmation.html'
})
export class CancelRequestConfirmation {

  constructor(private requestService: RequestService, private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  cancelUserRequest() {
    var currentDate = new Date()
    const data = {
      updatedAt: currentDate
    }

    this.requestService.cancelRequest(this.data.requestId, data).subscribe(response => {
      this.openDialog()
      this.router.navigate(["/user/" + this.data.userId + "/requests"])
    })
  }
  openDialog() {
    this.dialog.open(CancelRequestSuccessAlert)
  }
}
