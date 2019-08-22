import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  constructor() { }
  @Input() requestInfo
  @Input() visitFromDate
  @Input() visitToDate
  @Input() registrationDates
  @Input() totalVisitDay
  isCheckedIn: boolean = false

  ngOnInit() {
    console.log(this.registrationDates);
  }

}
