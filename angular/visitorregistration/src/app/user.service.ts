import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = "https://dellvisitorregistration.cfapps.io/api";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    const getUserUrl = `${baseUrl}/users`
    return this.http.get(getUserUrl)
  }
}
