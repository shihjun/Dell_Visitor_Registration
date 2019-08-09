import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {
  requestInfo: any
  users: any
  userId = null
  requestId = null
  allUsers: any
  allNames: string[]
  filteredUsers: Observable<string[]>
  fromDate = null
  fromTime = null
  toDate = null
  toTime = null
  createdDate = null
  currentStatus = null
  pContactId = null
  aContactId = null
  alternativeContactName = null
  alternativeContactBadge = null
  alternativeContactPhone = null

  requestForm = new FormGroup({
    visitorName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    icNumber: new FormControl("", [Validators.required]),
    carplateNumber: new FormControl(""),
    visitOnDate: new FormControl("", [Validators.required]),
    visitOnTime: new FormControl("", [Validators.required]),
    visitToDate: new FormControl("", [Validators.required]),
    visitToTime: new FormControl("", [Validators.required]),
    visitReason: new FormControl("", [Validators.required]),
    primaryCN: new FormControl("", [Validators.required]),
    alternativeCN: new FormControl(""),
    primaryPhone: new FormControl("", [Validators.required]),
    alternativePhone: new FormControl("")
  });

  constructor(private requestService: RequestService, private userService: UserService, private route: ActivatedRoute, 
              private router: Router, public dialog: MatDialog) { }

  getContactId(userArray) {
    for(let i = 0; i < userArray.length; i++) {
      if(userArray[i].name == this.requestForm.controls.primaryCN.value) {
        this.pContactId = userArray[i].id
        console.log("Primary Contact Id : " + this.pContactId)
      }
      if(this.requestForm.controls.alternativeCN.value != null && userArray[i].name == this.requestForm.controls.alternativeCN.value) {
        this.aContactId = userArray[i].id
        console.log("Alternative Contact : " + this.aContactId)
      } else {
        this.aContactId = ""
      }
    }
  }

  getAllUsers() {
    var names = []
    this.userService.getUsers().subscribe(response => {
      this.users = response
      for(let i = 0; i < this.users.length; i++) {
        if(this.users[i].isSecurity == false) {
          names.push(this.users[i].name)
        }
      }
      console.log(names)
      this.allNames = names
    })
  }

  getAllUserInfo() {
    this.requestService.getRequest(this.route.snapshot.params.requestId).subscribe(response => {
      this.requestInfo = response
      this.requestId = this.route.snapshot.params.requestId
      console.log(this.requestInfo)
      this.fromDate = new Date(this.requestInfo.request.visitFrom)
      this.fromTime = this.fromDate.toTimeString().split(' ')[0]
      this.toDate = new Date(this.requestInfo.request.visitTo)
      this.toTime = this.toDate.toTimeString().split(' ')[0]
      this.createdDate = this.requestInfo.request.createdAt
      this.currentStatus = this.requestInfo.request.status
      this.requestForm.controls.visitorName.setValue(this.requestInfo.request.name)
      this.requestForm.controls.phoneNumber.setValue(this.requestInfo.request.phone)
      this.requestForm.controls.icNumber.setValue(this.requestInfo.request.ic)
      this.requestForm.controls.carplateNumber.setValue(this.requestInfo.request.carPlate)
      this.requestForm.controls.visitOnDate.setValue(this.fromDate)
      this.requestForm.controls.visitOnTime.setValue(this.fromTime)
      this.requestForm.controls.visitToDate.setValue(this.toDate)
      this.requestForm.controls.visitToTime.setValue(this.toTime)
      this.requestForm.controls.visitReason.setValue(this.requestInfo.request.purpose)
      this.requestForm.controls.primaryCN.setValue(this.requestInfo.primaryContact.name)
      this.requestForm.controls.primaryPhone.setValue(this.requestInfo.request.primaryContactPhone)

      if(this.requestInfo.alternativeContact != null) {
        this.alternativeContactName = this.requestInfo.alternativeContact.name
        this.alternativeContactPhone = this.requestInfo.request.alternativeContactPhone
        this.requestForm.controls.alternativeCN.setValue(this.alternativeContactName)
        this.requestForm.controls.alternativePhone.setValue(this.alternativeContactPhone)
      } else {
        this.alternativeContactName = ""
        this.alternativeContactPhone = ""
      }
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()
    
    return this.allNames.filter(name => name.toLowerCase().includes(filterValue))
  }

  ngOnInit() {
    this.getAllUserInfo()
    this.getAllUsers()
    this.userId = this.route.snapshot.params.userId

    this.filteredUsers = this.requestForm.controls.primaryCN.valueChanges.pipe(
      startWith(''), map(value => this._filter(value))
    )
    
  }

  openDialog() {
    this.dialog.open(SaveRequestSuccessAlert)
  }

  onSubmit() {
    const { visitOnDate, visitOnTime, visitToDate, visitToTime } = this.requestForm.value
    var currentDate = new Date();
    
    var visitFrom = visitOnDate.toString()
    var visitTo = visitToDate.toString()

    visitFrom = visitFrom.replace("00:00", visitOnTime)
    visitTo = visitTo.replace("00:00", visitToTime)

    visitFrom = new Date(visitFrom).toISOString()
    visitTo = new Date(visitTo).toISOString()

    const updatedData = {
      name: this.requestForm.value.visitorName,
      ic: this.requestForm.value.icNumber,
      phone: this.requestForm.value.phoneNumber,
      carPlate: this.requestForm.value.carplateNumber,
      visitFrom: visitFrom,
      visitTo: visitTo,
      purpose: this.requestForm.value.visitReason,
      status: this.currentStatus,
      primaryContactPhone: this.requestForm.value.primaryPhone,
      alternativeContactPhone: this.requestForm.value.alternativePhone,
      createdAt: this.createdDate,
      updatedAt: currentDate
    }
    
    // if(!this.requestForm.invalid) {
      this.requestService.getUser().subscribe(response => {
        this.allUsers = response
        console.log(this.allUsers)
        this.getContactId(this.allUsers)
        this.requestService.updateRequest(this.route.snapshot.params.requestId, updatedData, this.pContactId, this.aContactId).subscribe(response => {
          this.openDialog()
          this.router.navigate(["/user/" + this.userId + "/request/" + this.requestId])
        })
      })
    // }
  }
}

@Component({
  selector: 'save-request-success-alert',
  templateUrl: './save-request-success-alert.html'
})
export class SaveRequestSuccessAlert {}
