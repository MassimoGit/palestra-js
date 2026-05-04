import { Trainer } from '../models/Trainer.js';

const API_URL = 'http://localhost:3000/api/trainers';

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error('Errore HTTP: ' + response.status);
  }
  return await response.json();
}

export async function getTrainers() {
  const response = await fetch(API_URL);
  const data = await handleResponse(response);
  return data.map((obj) => Trainer.fromJSON(obj));
}
