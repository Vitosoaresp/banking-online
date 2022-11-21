export interface ICreateTransfer {
  accountIn: number
  value: number
}

export interface ITransactions {
  id: string
  value: number
  debitedAccountId: number
  creditedAccountId: number
  createdAt: string
}
