import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  chartType = "bar"
  chartData = []
  chartLabels = []

  constructor(private requestService:RequestService) { }

  getRequestDate(response) {
    var createdDate

    for (let i = 0; i < response.length; i++) {
      createdDate = new Date(response[i].createdAt)
      response[i].createdAt = createdDate.toString().substring(0, 21)
    }
  }

  ngOnInit() {
    let dataset:any = []
    let requests = {}

    var sortedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.requestService.getAllRequests().subscribe(response => {
      dataset = response
      this.getRequestDate(dataset)
      dataset.sort((a, b) => sortedMonths.indexOf(a.createdAt.substr(4, 3)) - sortedMonths.indexOf(b.createdAt.substr(4, 3)));
      console.log(dataset)

      for (let request of dataset) {
        if (!requests[request.createdAt.substr(4, 3)]) {
          requests[request.createdAt.substr(4, 3)] = {}
        }
        console.log(request.status)
        
          if (!requests[request.createdAt.substr(4, 3)][request.status]) {
            requests[request.createdAt.substr(4, 3)][request.status] = 0
          }
          requests[request.createdAt.substr(4, 3)][request.status] += 1
      }
      console.log(requests)

      this.chartLabels = Object.keys(requests)

      let aggregateStatus = {}
      
      for(let month of Object.keys(requests)) {
        console.log(month)
        for(let status in requests[month]) {
          console.log(requests[month][status])
          if(!aggregateStatus[status]) {
            aggregateStatus[status] = []
            console.log(aggregateStatus[status])
          }
          if(requests[month]) {
            aggregateStatus[status].push(requests[month][status])
          }
        }
      }
      console.log(aggregateStatus)
      for(let status in aggregateStatus) {
        console.log(status)
        this.chartData.push({
          data: aggregateStatus[status],
          label: status
        })
      }
    })

  }

}
