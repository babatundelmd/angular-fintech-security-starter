import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
}

interface CreateTransactionRequest {
  amount: number;
  description: string;
  type: 'credit' | 'debit';
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);
  private apiUrl = '/api/transactions';

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  createTransaction(
    transaction: CreateTransactionRequest
  ): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  getTransaction(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }
}
