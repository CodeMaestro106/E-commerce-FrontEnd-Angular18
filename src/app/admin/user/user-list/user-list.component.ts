import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.type';
import { selectUserItems } from '../user.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteUserAction, getUserListAction } from '../user.actions';
import { Injector } from '@angular/core';
import { BaseComponent } from '../../../common/base/BaseComponent';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent extends BaseComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(
    private store: Store,
    injector: Injector,
  ) {
    super(injector);
    // Fetching categories
    this.users$ = this.store.select(selectUserItems);
  }

  ngOnInit() {
    console.log('component =>', this.users$);
    this.users$.subscribe((users) => {
      if (!users || users.length === 0) {
        this.getAllUsers();
      }
    });
  }

  private getAllUsers() {
    console.log('category list reload');
    this.store.dispatch(getUserListAction());
  }

  deleteUser(userId: number) {
    this.store.dispatch(deleteUserAction({ id: userId }));
  }
}
