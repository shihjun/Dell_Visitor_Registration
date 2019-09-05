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


      for (let request of dataset) {
        if (!requests[request.createdAt.substr(4, 3)]) {
          requests[request.createdAt.substr(4, 3)] = {}
        }
        
          if (!requests[request.createdAt.substr(4, 3)][request.status]) {
            requests[request.createdAt.substr(4, 3)][request.status] = 0
          }
          requests[request.createdAt.substr(4, 3)][request.status] += 1
      }

      this.chartLabels = Object.keys(requests)

      let aggregateStatus = {}
      
      for (let month of Object.keys(requests)) {
        for (let status in requests[month]) {
          if (!aggregateStatus[status]) {
            aggregateStatus[status] = []
          }
        }
      }
      for (let month of Object.keys(requests)) {
        for (let status in aggregateStatus) {
          if (requests[month][status]) {
            aggregateStatus[status].push(requests[month][status])
          } else {
            aggregateStatus[status].push(0)
          }
        }
      }

      for(let status in aggregateStatus) {
        this.chartData.push({
          data: aggregateStatus[status],
          label: status
        })
      }
    })

  }

}
