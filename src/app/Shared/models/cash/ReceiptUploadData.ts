import { Receipt } from "./receipt";

export class ReceiptUploadData {
    constructor(
        public batchFileEncoded: string,
        public fileType: string,
        public fileName: string,
        public receipt: Receipt
    ) { }
}