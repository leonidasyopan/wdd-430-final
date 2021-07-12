import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '../../contact.model'

@Component({
  selector: 'shopping-list-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    this.contactSelected.emit();
  }

}
