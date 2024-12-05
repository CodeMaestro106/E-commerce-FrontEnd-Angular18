import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../store/user/user.type';
import { selectUserItems } from '../../../store/user/user.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deleteUserAction,
  getUserListAction,
} from '../../../store/user/user.actions';
import { Injector } from '@angular/core';
import { BaseComponent } from '../../../common/base/BaseComponent';
import { ModalService } from '../../../common/modal/service/modal.service';

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
    private modalService: ModalService,
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

  // delteUserModal(userId: number) {
  //   this.store.dispatch(deleteUserAction({ id: userId }));
  // }

  delteUserModal(id: number) {
    const modalData = {
      title: 'Delete Category',
      content: 'Are you sure your want to remove the this user?',
      confirmAction: () => {
        this.store.dispatch(deleteUserAction({ id: id }));
      },
    };
    this.modalService.openModal(modalData);
  }
}
