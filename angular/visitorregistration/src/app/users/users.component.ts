import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers: any
  userRole: any = []

  constructor(private userService: UserService) { }

  checkRole(array) {
    for(let i = 0; i < array.length; i++) {
      if(array[i].isSecurity == false) {
        this.userRole[i] = "User"
      } else {
        this.userRole[i] = "Security"
      }
      Object.assign(this.allUsers[i], {role: this.userRole[i]})
    }
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      this.allUsers = response
      console.log(this.allUsers)
      this.checkRole(this.allUsers)
      
      console.log(this.userRole)
    })
  }

}
