import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = "https://dellvisitorregistration.cfapps.io/api";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

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
