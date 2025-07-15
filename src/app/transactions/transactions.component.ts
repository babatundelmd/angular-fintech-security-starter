import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { CommonModule } from '@angular/common';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
}

@Component({
  selector: 'app-transactions',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  transactions = signal<Transaction[]>([]);
  showForm = signal(false);
  isSubmitting = signal(false);

  transactionForm: FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    type: ['', [Validators.required]],
  });

  get amountControl() {
    return this.transactionForm.get('amount')!;
  }
  get descriptionControl() {
    return this.transactionForm.get('description')!;
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  showNewTransactionForm(): void {
    this.showForm.set(true);
    this.transactionForm.reset();
  }

  cancelForm(): void {
    this.showForm.set(false);
    this.transactionForm.reset();
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.isSubmitting.set(true);

      this.transactionService
        .createTransaction(this.transactionForm.value)
        .subscribe({
          next: (transaction) => {
            this.isSubmitting.set(false);
            this.showForm.set(false);
            this.loadTransactions(); // Reload transactions
            this.transactionForm.reset();
          },
          error: (error) => {
            this.isSubmitting.set(false);
            console.error('Transaction failed:', error);
          },
        });
    }
  }

  private loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
      error: (error) => {
        console.error('Failed to load transactions:', error);
      },
    });
  }
}
