import { Component, OnInit, inject, signal } from '@angular/core';
import { TrainerListComponent } from './components/trainer-list/trainer-list';
import { CustomerListComponent } from './components/customer-list/customer-list';
import { CustomerFormComponent } from './components/customer-form/customer-form';
import { TrainerService} from './services/trainer.service';
import { CustomerService} from './services/customer.service';
import { Customer } from './models/Customer';
import { CustomerInput } from './models/CustomerInput';
import { Trainer } from './models/Trainer';

type View = 'trainers' | 'customers';

@Component({
  selector: 'app-root',
  imports: [TrainerListComponent, CustomerListComponent, CustomerFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private trainerService = inject(TrainerService);
  private customerService = inject(CustomerService);

  view = signal<View>('customers');
  trainers = signal<Trainer[]>([]);
  customers = signal<Customer[]>([]);
  editingCustomer = signal<Customer | null>(null);

  ngOnInit() {
    this.loadTrainers();
    this.loadCustomers();
  }

  setView(v: View) {
    this.view.set(v);
    this.editingCustomer.set(null);
  }

  loadTrainers() {
    this.trainerService.getAll().subscribe({
      next: (data) => this.trainers.set(data),
      error: (err) => console.error('Errore caricamento trainer:', err),
    });
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data) => this.customers.set(data),
      error: (err) => console.error('Errore caricamento customer:', err),
    });
  }

  onSaveCustomer(data: CustomerInput) {
    const editing = this.editingCustomer();
    if (editing) {
      this.customerService.update(editing.id, data).subscribe({
        next: () => {
          this.editingCustomer.set(null);
          this.loadCustomers();
        },
        error: (err) => alert('Errore aggiornamento: ' + err.message),
      });
    } else {
      this.customerService.create(data).subscribe({
        next: () => this.loadCustomers(),
        error: (err) => alert('Errore inserimento: ' + err.message),
      });
    }
  }

  onEditCustomer(customer: Customer) {
    this.editingCustomer.set(customer);
  }

  onDeleteCustomer(id: number) {
    if (!confirm('Eliminare questo customer?')) return;
    this.customerService.delete(id).subscribe({
      next: () => this.loadCustomers(),
      error: (err) => alert('Errore eliminazione: ' + err.message),
    });
  }

  onCancelEdit() {
    this.editingCustomer.set(null);
  }
}
