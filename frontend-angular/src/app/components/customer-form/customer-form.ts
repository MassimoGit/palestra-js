import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trainer } from '../../models/Trainer';
import { CustomerInput } from '../../models/CustomerInput';
import { Customer } from '../../models/Customer';


const emptyForm = (): CustomerInput => ({ name: '', surname: '', email: '', trainer_id: null });

@Component({
  selector: 'app-customer-form',
  imports: [FormsModule],
  templateUrl: './customer-form.html',
})
export class CustomerFormComponent implements OnChanges {
  @Input() trainers: Trainer[] = [];
  @Input() initialCustomer: Customer | null = null;
  @Output() save = new EventEmitter<CustomerInput>();
  @Output() cancel = new EventEmitter<void>();

  formData: CustomerInput = emptyForm();
  isSubmitting = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialCustomer']) {
      const c = this.initialCustomer;
      if (c) {
        this.formData = {
          name: c.name,
          surname: c.surname,
          email: c.email,
          trainer_id: c.trainer_id,
        };
      } else {
        this.formData = emptyForm();
      }
    }
  }

  get isValid(): boolean {
    return (
      this.formData.name.trim() !== '' &&
      this.formData.surname.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.trainer_id !== null
    );
  }

  onSubmit() {
    if (!this.isValid) return;
    this.isSubmitting = true;
    this.save.emit({
      name: this.formData.name.trim(),
      surname: this.formData.surname.trim(),
      email: this.formData.email.trim(),
      trainer_id: Number(this.formData.trainer_id),
    });
    this.formData = emptyForm();
    this.isSubmitting = false;
  }
}
