import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const baseUrl = "https://dellvisitorregistration.cfapps.io/api";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private registrations: BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private http: HttpClient) {
    // this.getAllRegistrationsData().subscribe(response => {
    //   this.registrations.next(response)
    // })
  }

  // getAllRegistrationsData() {
  //   const getRegistrationUrl = `${baseUrl}/registrations/`
  //   return this.http.get(getRegistrationUrl)
  // }

  getAllRegistrations() {
    const getRegistrationUrl = `${baseUrl}/registrations/`
    return this.http.get(getRegistrationUrl)
  }

  getAllNullCheckoutRegistration() {
    const getRegistrationUrl = `${baseUrl}/registrations/nullcheckout`
    return this.http.get(getRegistrationUrl)
  }

  getRegistration(requestId) {
    const getRegistrationUrl = `${baseUrl}/request/${requestId}/registrations`
    return this.http.get(getRegistrationUrl)
  }

  checkInRegistration(data, userId, requestId, escortById) {
    var checkInUrl = `${baseUrl}/user/${userId}/request/${requestId}/registrations?escortById=${escortById}`
    return this.http.post(checkInUrl, data)
  }

  checkOutRegistration(data, userId, registrationId, escortById, status) {
    var checkOutUrl = `${baseUrl}/user/${userId}/registration/${registrationId}?escortById=${escortById}&status=${status}`
    return this.http.post(checkOutUrl, data)
  }
}
