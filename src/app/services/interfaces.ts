// Define an interface for account
export interface Account {
    accountNumber: string;
    accountType: string;
    balance: number;
    // Add other necessary details
  }
  
  // Define an interface for family
  export interface Family {
    father: Account[];
    mother: Account[];
    child: Account[];
  }
  