import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Trainer} from '../models/Trainer';


export type TrainerInput = Omit<Trainer, 'id'>;

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/trainers';

  getAll(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.apiUrl);
  }

  create(trainer: TrainerInput): Observable<Trainer> {
    return this.http.post<Trainer>(this.apiUrl, trainer);
  }

  update(id: number, trainer: TrainerInput): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/${id}`, trainer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
