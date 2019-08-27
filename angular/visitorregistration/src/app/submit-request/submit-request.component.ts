import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})

export class SubmitRequestComponent implements OnInit {
  users: any
  allNames: string[]
  isSubmitted = null
  pContactId = null
  aContactId = null
  userId = null
  minDate = new Date();
  filteredPrimaryUsers: Observable<string[]>
  filteredAlternativeUsers: Observable<string[]>

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

  constructor(private requestService: RequestService, private userService: UserService, private router: Router, 
              private route: ActivatedRoute, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      this.users = response
    })
    this.userId = this.route.snapshot.params.userId
    this.getAllUsers()
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
      this.filteredPrimaryUsers = this.requestForm.controls.primaryCN.valueChanges.pipe(
        startWith(''), map(value => this._filter(value))
      );
      this.filteredAlternativeUsers = this.requestForm.controls.alternativeCN.valueChanges.pipe(
        startWith(''), map(value => this._filter(value))
      );
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()
    
    return this.allNames.filter(name => name.toLowerCase().includes(filterValue))
  }

  getContactId(userArray) {
    for(let i = 0; i < userArray.length; i++) {
      if(userArray[i].name == this.requestForm.controls.primaryCN.value) {
        this.pContactId = userArray[i].id
        console.log("Primary Contact Id : " + this.pContactId)
      }
      if(userArray[i].name == this.requestForm.controls.alternativeCN.value) {
        this.aContactId = userArray[i].id
        console.log("Alternative Contact : " + this.aContactId)
      } else {
        this.aContactId = ""
        console.log("Alternative Contact : " + this.aContactId)
      }
    }
  }

  openDialog() {
    this.dialog.open(SubmitRequestSuccessAlert);
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

    const data = {
      name: this.requestForm.value.visitorName,
      ic: this.requestForm.value.icNumber,
      phone: this.requestForm.value.phoneNumber,
      carPlate: this.requestForm.value.carplateNumber,
      visitFrom: visitFrom,
      visitTo: visitTo,
      purpose: this.requestForm.value.visitReason,
      status: "New",
      primaryContactPhone: this.requestForm.value.primaryPhone,
      alternativeContactPhone: this.requestForm.value.alternativePhone,
      createdAt: currentDate,
      updatedAt: currentDate
    }

    if(!this.requestForm.invalid) {
      console.log(data)
      this.getContactId(this.users)
    
      this.requestService.createRequest(data, this.pContactId, this.aContactId, this.userId).subscribe(response => {
        this.isSubmitted = true
        this.openDialog()
        this.router.navigate(["/user/" + this.userId + "/requests"])
      })
    } else {
      this.isSubmitted = false
    }
  }
}

@Component({
  selector: 'submit-request-success-alert',
  templateUrl: './submit-request-success-alert.html'
})
export class SubmitRequestSuccessAlert {}
