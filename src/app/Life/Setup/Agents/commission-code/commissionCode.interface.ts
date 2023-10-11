export interface CommissionCode {
    commType: {
        id: number,
        code: string,
        group: string,
        description: string,
        hierachyCommBasis: string,
        hierachyCommTable: string,
        versionNo: number,
        writingCommTable: string
    },
    commTypeVersion: [
        {
            date: Date,
            versionNo: number,
            id: number,
            rowId: number,
            deleted: boolean,
        }
    ]
}