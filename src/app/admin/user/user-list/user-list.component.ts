import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../../common/service/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  private getAllUsers() {
    console.log('user list reload');
    this.userService
      .getAllUsers()
      .subscribe((data: any) => {
        console.log(data);
        this.usersSubject.next(data); // Update the BehaviorSubject
      });
    console.log(this.usersSubject)
  }


  userDetails(id: number) {
    this.router.navigate(['admin/user-details', id]);
  }


  deleteUser(id: number) {
    this.userService.deleteUserByAdmin(id.toString()).subscribe((data) => {
      console.log(data);
      this.getAllUsers();
    });
  }
}
