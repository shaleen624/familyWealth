import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../services/family.service';
import { Family, Account } from '../services/interfaces';

@Component({
  selector: 'app-family-acct-details', // Updated selector
  templateUrl: './family-acct-details.component.html',
  styleUrls: ['./family-acct-details.component.scss']
})
export class FamilyAcctDetailsComponent implements OnInit {
  familyData!: any;
  totalFamilyBalance!: number;
  isCollapsed: { [key: string]: boolean } = {};

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.familyService.getFamilyData().subscribe(data => {
      debugger
      this.familyData = data;
      this.calculateTotalFamilyBalance();
    });
  }

  calculateTotalFamilyBalance() {
    let allAccounts: Account[] = [];
    let person:any;
    for (person of Object.values(this.familyData)) {
      allAccounts = [...allAccounts, ...person];
    }
    this.totalFamilyBalance = allAccounts.reduce((total, account) => total + account.balance, 0);
  }

  getPersonTotalBalance(person: string): number {
    const accounts = this.familyData[person.toLowerCase()];
    return accounts.reduce((total: any, account: { balance: any; }) => total + account.balance, 0);
  }
  
  

  // updateAccount(account: Account, person: string) {
  //   this.familyService.updateAccount(account, person);
  // }

  updateAccount(account: Account, person: string) {
    const updatedAccounts = this.familyData[person.toLowerCase()].map((acc: Account) => {
      if (acc.accountNumber === account.accountNumber) {
        return { ...acc, ...account }; // Update existing account
      }
      return acc;
    });
  
    this.familyService.updateAccount(updatedAccounts, person);
  }

  toggleCollapse(person: string) {
    this.isCollapsed[person] = !this.isCollapsed[person];
  }
  
}
