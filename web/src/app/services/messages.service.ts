import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private snack: MatSnackBar) {}

  error(message?: string) {
    this.snack.open(`${message ? '' : 'Hiba!'} ${message || ''}`, 'Dismiss', {
      panelClass: ['snack-error'],
    });
  }

  warn(message?: string) {
    this.snack.open(`Figyelem! ${message || ''}`, 'Dismiss', {
      panelClass: ['snack-warning'],
      duration: 10000,
    });
  }

  info(message: string, duration?: number) {
    this.snack.open(message, 'Dismiss', {
      panelClass: ['snack-info'],
      duration: duration || 5000,
    });
  }

  success(message: string, duration?: number) {
    this.snack.open(message, 'Dismiss', {
      panelClass: ['snack-success'],
      duration: duration || 5000,
    });
  }
}
