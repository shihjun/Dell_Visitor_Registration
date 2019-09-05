import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  chartType = "line"
  chartData = []
  chartLabels = []

  constructor(private registrationService: RegistrationService) { }

  getRequestDate(response) {
    var checkInDate

    for (let i = 0; i < response.length; i++) {
      checkInDate = new Date(response[i].checkinAt)
      response[i].checkinAt = checkInDate.toString().substring(0, 21)

    }
  }

  ngOnInit() {
    let dataset:any = []
    let allRegistations = {}

    var sortedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.registrationService.getAllRegistrations().subscribe(response =>{
      dataset = response
      this.getRequestDate(dataset)
      dataset.sort((a, b) => sortedMonths.indexOf(a.checkinAt.substr(4, 3)) - sortedMonths.indexOf(b.checkinAt.substr(4, 3)));
      
      for(let registration of dataset) {
        console.log(registration.checkinAt.substr(4, 3))
        if (!allRegistations[registration.checkinAt.substr(4, 3)]) {
          allRegistations[registration.checkinAt.substr(4, 3)] = 0
        }
        allRegistations[registration.checkinAt.substr(4, 3)] += 1
      }
  
      this.chartLabels = Object.keys(allRegistations)

      console.log(allRegistations)
      for(let month in allRegistations) {
        console.log(Object.values(allRegistations))
        
        this.chartData.push({
          data: allRegistations[month],
          label: "Number of Visitors"
        })
        
      }
      console.log(this.chartData)
    })
  }
}
