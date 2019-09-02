import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RegistrationService } from '../registration.service';
import { RequestDetailsComponent } from '../request-details/request-details.component'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registrationService: RegistrationService, public dialog: MatDialog, private requestDetailsComponent: RequestDetailsComponent) { }

  @Input() requestInfo
  @Input() visitFromDate
  @Input() visitToDate
  @Input() registrationDates
  @Input() totalVisitDay
  @Input() userId
  @Input() allUsers
  allNames: string[]
  filteredUsers: Observable<string[]>
  isCheckedIn: boolean = false
  currentTime = new Date()
  currentDate = new Date().toString().substring(0, 15)
  belongingsForm = new FormControl()
  escortForm = new FormControl(null, [Validators.required])
  escortById = null;
  allRequestRegistrations: any
  checkInDates: any = null
  checkInTime = null
  checkOutTime = null
  registrationDetails: any = []
  registrationId = null
  isEscortBySelected = null
  currentDateNum: number
  visitFrom: number
  visitToCurrentDays

  ngOnInit() {
    this.getRequestRegistrations()
    this.getAllUsers()
    console.log(this.registrationDates)
  }

  openCheckInDialog() {
    this.dialog.open(CheckinRegistrationSuccessAlert);
  }

  openCheckOutDialog() {
    this.dialog.open(CheckoutRegistrationSuccessAlert);
  }

  getAllUsers() {
    var names = []
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].isSecurity == false) {
        names.push(this.allUsers[i].name)
      }
    }
    console.log(names)
    this.allNames = names
    this.filteredUsers = this.escortForm.valueChanges.pipe(
      startWith(''), map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.allNames.filter(name => name.toLowerCase().includes(filterValue))
  }

  getRequestRegistrations() {
    this.registrationService.getRegistration(this.requestInfo.request.id).subscribe(response => {
      this.allRequestRegistrations = response
      console.log(this.allRequestRegistrations)

      this.checkRegistrationIsExist()
    })


  }

  checkRegistrationIsExist() {
    for (let i = 0; i < this.registrationDates.length; i++) {
      var data
      data = {
        visitDate: this.registrationDates[i]
      }
      if (this.allRequestRegistrations.registrations.length != 0) {
        for (let j = 0; j < this.allRequestRegistrations.registrations.length; j++) {
          var date = new Date(this.allRequestRegistrations.registrations[j].checkinAt).toString().substring(0, 15)

          if (this.registrationDates[i] == date) {
            this.checkInTime = new Date(this.allRequestRegistrations.registrations[j].checkinAt).toString().substring(16, 21)

            if (this.allRequestRegistrations.registrations[j].checkoutAt != null) {
              this.checkOutTime = new Date(this.allRequestRegistrations.registrations[j].checkoutAt).toString().substring(16, 21)
            } else {
              this.checkOutTime = null
            }
            data = {
              visitDate: this.registrationDates[i],
              belongings: this.allRequestRegistrations.registrations[j].belongings,
              escortBy: this.allRequestRegistrations.escortBy[j].name,
              checkInTime: this.checkInTime,
              checkOutTime: this.checkOutTime
            }
            j = this.allRequestRegistrations.registrations.length
          } else {
            data = {
              visitDate: this.registrationDates[i],
              belongings: null,
              escortBy: null,
              checkInTime: null,
              checkOutTime: null
            }
          }
          this.registrationDetails[i] = data
        }
      } else {
        this.registrationDetails[i] = data
      }
    }
    console.log(this.registrationDetails)

    this.currentDateNum = Math.round(Math.abs(new Date((new Date().toString().substring(0, 15))).getTime()))
    this.visitFrom = Math.round(Math.abs(new Date(this.visitFromDate.substring(0, 15)).getTime()))
    var oneDay = 24 * 60 * 60 * 1000;
    var NumOfDays = Math.round(Math.abs((new Date(new Date().toString().substring(0, 15)).getTime() - new Date(this.visitFromDate.substring(0, 15)).getTime()) / oneDay))
    this.visitToCurrentDays = NumOfDays
    console.log("Current days till visit: " + NumOfDays)
    console.log(this.currentDateNum)
    console.log(this.visitFrom)
  }



  checkIn() {
    if (this.escortForm.value != null) {
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.escortForm.value === this.allUsers[i].name) {
          this.escortById = this.allUsers[i].id
        }
      }
      const data = {
        checkinAt: this.currentTime,
        checkoutAt: null,
        belongings: this.belongingsForm.value,
        createdAt: this.currentTime,
        updatedAt: this.currentTime
      }
      console.log(data)
      this.registrationService.checkInRegistration(data, this.userId, this.requestInfo.request.id, this.escortById).subscribe(response => {
        console.log("Check in Successfully")
        this.openCheckInDialog()
        this.ngOnInit()
        this.requestDetailsComponent.getRequestInfo()
      })
    } else {
      this.isEscortBySelected = false
    }
  }

  checkOut() {
    var data
    var status

    for (let j = 0; j < this.allRequestRegistrations.registrations.length; j++) {
      var checkinDate = new Date(this.allRequestRegistrations.registrations[j].checkinAt).toString().substring(0, 15)
      var currentdate = new Date(this.currentTime).toString().substring(0, 15)

      if (j == this.registrationDates.length - 1) {
        status = "Complete"
      } else {
        status = "On-Site"
      }

      if (currentdate == checkinDate) {
        this.registrationId = this.allRequestRegistrations.registrations[j].id
        this.escortById = this.allRequestRegistrations.escortBy[j].id
        j = this.allRequestRegistrations.registrations.length
      }
    }

    data = {
      checkoutAt: this.currentTime,
      updatedAt: this.currentTime
    }

    this.registrationService.checkOutRegistration(data, this.userId, this.registrationId, this.escortById, status).subscribe(response => {
      console.log("Check out Successfully")
      this.openCheckOutDialog()
      this.ngOnInit()
      this.requestDetailsComponent.getRequestInfo()
    })
  }
}

@Component({
  selector: 'checkin-registration-success-alert',
  templateUrl: './checkin-registration-success-alert.html'
})
export class CheckinRegistrationSuccessAlert { }

@Component({
  selector: 'checkout-registration-success-alert',
  templateUrl: './checkout-registration-success-alert.html'
})
export class CheckoutRegistrationSuccessAlert { }
