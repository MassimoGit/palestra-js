import { Customer } from '../models/Customer.js';
import { CustomerInput } from '../models/CustomerInput.js';

const API_URL = 'http://localhost:3000/api/customers';

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error('Errore HTTP: ' + response.status);
  }
  return await response.json();
}

export async function getCustomers() {
  const response = await fetch(API_URL);
  const data = await handleResponse(response);
  return data.map((obj) => Customer.fromJSON(obj));
}

export async function createCustomer(plain) {
  const input = new CustomerInput(plain.name, plain.surname, plain.email, plain.trainer_id);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await handleResponse(response);
  return Customer.fromJSON(data);
}

export async function updateCustomer(id, plain) {
  const input = new CustomerInput(plain.name, plain.surname, plain.email, plain.trainer_id);
  const response = await fetch(API_URL + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await handleResponse(response);
  return Customer.fromJSON(data);
}

export async function deleteCustomer(id) {
  const response = await fetch(API_URL + '/' + id, { method: 'DELETE' });
  return await handleResponse(response);
}
