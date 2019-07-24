import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';

const baseUrl = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class RequestService {


  constructor(private http: HttpClient) { }

  getUser() {
    const getUserUrl = `${baseUrl}/users`;
    return this.http.get(getUserUrl);
  }

  createRequest(requestData) {
    console.log(requestData)
    const url = `${baseUrl}/user/4/requests?primarycontactId=3&alternativeContactId=4`
    console.log(url)
    return this.http.post(url, requestData);
  }


}
