import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public isModalOpen$ = new BehaviorSubject<boolean>(false);
  //   private selectedItemId$ = new BehaviorSubject<number | null>(null);
  public modalContent$ = new BehaviorSubject<any>(null);

  openModal(modalContent: any) {
    this.isModalOpen$.next(true);
    this.modalContent$.next(modalContent);
  }

  closeModal() {
    this.isModalOpen$.next(false);
    this.modalContent$.next(null);
  }
}
