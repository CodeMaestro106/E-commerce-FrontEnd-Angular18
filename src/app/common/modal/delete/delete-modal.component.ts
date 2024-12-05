// modal.component.ts
import { Component, OnInit } from '@angular/core';

import { ModalService } from '../service/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent implements OnInit {
  isModalOpen: boolean = false;
  modalContent: any = null;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    // Subscribe to modal open/close state
    this.modalService.isModalOpen$.subscribe((isOpen) => {
      this.isModalOpen = isOpen;
    });

    // Subscribe to modal content
    this.modalService.modalContent$.subscribe((content) => {
      this.modalContent = content;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  confirmModal() {
    if (this.modalContent && this.modalContent.confirmAction) {
      this.modalContent.confirmAction();
      this.closeModal();
    }
  }
}
