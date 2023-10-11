export interface IVehicleBrand {
  brandCode: string;
  description: string;
  vehicleType:string
}

export interface IAgentNo {
  no: string;
}

export interface IVehicleMakesInfo{
    makeCode: string,
    description: string,
    createdDate: string,
    updatedDate: string,
    brandCode: string,
    id: number,
}

export class IVehicleMake {
  brandCode?: string;
  description?: string;
  makeCode?: string
}

export class IVehicleModel {
    brandCode?: string;
    description?: string;
    endProduct?: string;
    makeCode?: string;
    modelCode?: string;
    startProduct?: string;
    vehicleCat?: string;
    vehicleGenre?: string

}

export interface IVehicleModelSpec{
  modelCode: number,
  modelName: string,
  specCode: number,
  specDesc: string,
  unit: string,
  value: number
}

export interface IRegisterNewCertificate{
    agentNo: string;
    authBy: string;
    branchCode: string;
    certCat: string;
    companyCode: string;
    createdBy: string;
    fromRange: number;
    issueFrom: string;
    noCert: number;
    toRange: number;


}

export interface ISetUpCertificate{
    certCat: string;
    companyCode: string;
    costPerCert: number;
    currCode: string;
    reOrderLevel: number;

}

export interface IGetSums{

    certConvertSum: string;
    certIssueSum: string;
    certUnConvertSum: string;

}

export interface IIssueCertificate{
    agentNo: string;
    branchCode: string;
    certCat: string;
    certIssue: number;
    certUnConvert: number;
    companyCode: number;
    createdBy: string;
    cumCertIssue: number;
    fromRange: number;
    issueFrom: string;
    toRange: number


}

export class IPreorderCertificate{
    certCat: string;
    certUnConvert: number;
    certUnIssue: number;
    companyCode: string;
    costOrder: number;
    order: number


}



