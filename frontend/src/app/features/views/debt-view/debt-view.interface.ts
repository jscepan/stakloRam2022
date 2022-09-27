export interface DebtView {
  owedSum: number;
  debtSum: number;
  startAmount: number;
  transactions: Transaction[];
}

export interface Transaction {
  date: Date;
  description: string;
  owed: number;
  debt: number;
  state: number;
}
