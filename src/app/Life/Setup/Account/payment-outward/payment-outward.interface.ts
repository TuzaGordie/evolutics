export interface PaymentOutward {
    companyPayout: {
        active: Boolean,
        authBy: string,
        authOn: string,
        chqBatchFile: string,
        dateCreated: string,
        dcBatchFile: string,
        dcBatchName: string,
        defaultPayoutAccNo: string,
        defaultPayoutBank: string,
        defaultPayoutSortCode: string,
        effOn: string,
        encryptPayoutProcess: string,
        mmBatchFile: string,
        payoutMethod: string
        companyCode: string
    },
    companyPayoutAccTypes: [
        {
            bankAccNo: string,
            bankCode: string,
            bankSortCode: string,
            claimType: string,
            payAccCode: string,
            paymentType: string,
            payoutBasis: string,
            payoutFileFormat: string
        }
    ],

    companyPayoutRounding: {
        rounding: number,
        currency: number
    }
}