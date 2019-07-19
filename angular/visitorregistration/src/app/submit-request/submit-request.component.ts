import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {

  requestForm = new FormGroup({
    visitorName: new FormControl(""),
    phoneNumber: new FormControl(""),
    icNumber: new FormControl(""),
    carplateNumber: new FormControl(""),
    visitOnDate: new FormControl(""),
    visitOnTime: new FormControl(""),
    visitToDate: new FormControl(""),
    visitToTime: new FormControl(""),
    visitReason: new FormControl(""),
    primaryCN: new FormControl(""),
    alternativeCN: new FormControl(""),
    primaryBadge: new FormControl(""),
    alternativeBadge: new FormControl(""),
    primaryPhone: new FormControl(""),
    alternativePhone: new FormControl("")
  });

  constructor(private requestService: RequestService) { }
    users: any;

  ngOnInit() {
    
  }

  onSubmit() {
    const { visitOnDate, visitOnTime, visitToDate, visitToTime } = this.requestForm.value

    // const visitFrom = visitOnDate.toDateString() + " " + visitOnTime
    // const visitTo = visitToDate.toDateString() + " " + visitToTime

    this.requestService.getUser().subscribe(response => {
      this.users = response
      console.log(this.users)
    })

    const data = {
      name: this.requestForm.value.visitorName,
      ic: this.requestForm.value.icNumber,
      phone: this.requestForm.value.phoneNumber,
      carPlate: this.requestForm.value.carplateNumber,
      visitFrom: "7/19/2019 04:30:00.0",
      visitTo: "7/19/2019 04:30:00.0",
      purpose: this.requestForm.value.visitReason,
      department: "IT",
      status: "New",
      primaryContactPhone: this.requestForm.value.primaryPhone,
      alternativeContactPhone: this.requestForm.value.alternativePhone,
      createdAt: "7/19/2019 04:30:00.0",
      updatedAt: "7/19/2019 04:30:00.0"
    }

    if(!this.requestForm.invalid) {
      console.log(data)
      this.requestService.createRequest(data)
    }
  }
}
