export class BankAccount {
    accountNo: string
    active: boolean
    authBy: string
    authOn: string
    bankCode: string
    rowId: number
    companyCode: string
    companyId: number
    description: string
    effOn: string
    sortCode: string
    bankSortCode
    id: number
}

export interface BankSortCode {
    address: String, bankName: String, city: String, country: String, pageNumber: Number, town: String, pageSize: Number, sortBy: String, sortDirection: String
}
