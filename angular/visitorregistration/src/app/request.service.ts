import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const baseUrl = "https://dellvisitorregistration.cfapps.io/api";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private allRequests: BehaviorSubject<any[]> = new BehaviorSubject([])

  constructor(private http: HttpClient) { }

  getUserRequests(userId) {
    const getUserRequestsUrl = `${baseUrl}/user/${userId}/requests`
    return this.http.get(getUserRequestsUrl)
  }

  getRequest(requestId) {
    const getRequestUrl = `${baseUrl}/request/${requestId}`
    return this.http.get(getRequestUrl)
  }

  getAllRequests() {
    const getAllRequestsUrl = `${baseUrl}/requests`
    return this.http.get(getAllRequestsUrl)
  }

  createRequest(requestData, primaryContactId, alternativeContactId, userId) {
    console.log(requestData)
    var url
    if (alternativeContactId != null) {
      url = `${baseUrl}/user/${userId}/requests?primaryContactId=${primaryContactId}&alternativeContactId=${alternativeContactId}`
    } else {
      url = `${baseUrl}/user/${userId}/requests?primaryContactId=${primaryContactId}`
    }
    return this.http.post(url, requestData)
  }

  cancelRequest(requestId, data) {
    const url = `${baseUrl}/request/${requestId}/cancel`
    return this.http.post(url, data)
  }

  updateRequest(requestId, data, primaryContactId, alternativeContactId) {
    var url
    if (alternativeContactId != null) {
      url = `${baseUrl}/request/${requestId}?primaryContactId=${primaryContactId}&alternativeContactId=${alternativeContactId}`
    } else {
      url = `${baseUrl}/request/${requestId}?primaryContactId=${primaryContactId}`
    }
    return this.http.post(url, data)
  }
}
