import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const baseUrl = "https://dellvisitorregistration.cfapps.io/api";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private http: HttpClient) {
    this.getUsersData().subscribe(response => {
      this.users.next(response)
    })

  }

  getUsersData() {
    const getUserUrl = `${baseUrl}/users`
    return this.http.get(getUserUrl)
  }

  getUsers() {
    return this.users
  }
}
