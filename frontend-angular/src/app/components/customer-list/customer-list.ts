import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../models/Customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.html',
})
export class CustomerListComponent {
  @Input() customers: Customer[] = [];
  @Output() edit = new EventEmitter<Customer>();
  @Output() delete = new EventEmitter<number>();
}
