import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private familyData: BehaviorSubject<any> = new BehaviorSubject<any>({
    father: [],
    mother: [],
    child: []
  });

  constructor() {
    // Populate mock data when the service is initialized
    this.populateMockData();
  }

  getFamilyData() {
    return this.familyData.asObservable();
  }

  updateAccount(accounts: Account[], person: string) {
    const currentData = this.familyData.value;
    const updatedData = { ...currentData, [person.toLowerCase()]: accounts };
    this.familyData.next(updatedData);
  }

  private populateMockData() {
    const fatherAccounts: Account[] = [
      { accountNumber: '123456789', accountType: 'Checking', balance: 5000 },
      { accountNumber: '987654321', accountType: 'Savings', balance: 10000 }
    ];

    const motherAccounts: Account[] = [
      { accountNumber: '456789123', accountType: 'Checking', balance: 7000 },
      { accountNumber: '654321987', accountType: 'Savings', balance: 15000 }
    ];

    const childAccounts: Account[] = [
      { accountNumber: '789123456', accountType: 'Savings', balance: 2000 }
    ];

    this.updateAccount(fatherAccounts, 'Father');
    this.updateAccount(motherAccounts, 'Mother');
    this.updateAccount(childAccounts, 'Child');
  }
}
