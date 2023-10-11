export class CreateProcessControl {
  constructor(
    public controlPayout: ControlPayout,
    public controlPayoutPayout: ControlPayoutPayout[],
    public controlPayoutProduct: ControlPayoutProduct[]
  ) {}
}

export class ControlPayout {
  authAdminEndorse: boolean = false;
  authAgentEndorse: boolean = false;
  authClientEndorse: boolean = false;
  authPolicyEndorse: boolean = false;
  authProviderEndorse: boolean = false;
  authRateEndorse: boolean = false;
  authSetupEndorse: boolean = false;
  autoTreaty: boolean = false;
  companyCode: string;
  controlPolicyAccount: boolean = false;
  controlSuspenseSwitch: boolean = false;
  id: number;
}

export class ControlPayoutPayout {
  rowId: number;
  id: number;
  payoutReason: string;
  authReqPayout: boolean = false;
  controlPayout: boolean = false;
  controlThreshold: number;
  companyCode: string;
  payoutFileFormatId: number;
  autoPayoutThreshold: number;
  controlReqPayout: boolean = false;
  dvReqAuth: boolean = false;
  dvAuthThreshold: number;
  payoutBasis: string;
}

export class ControlPayoutProduct {
  authPayFromSuspense: boolean = false;
  authReqQuote: boolean = false;
  autoPayoutThreshold: number;
  autoPaySuspense: boolean = false;
  autoReqPayout: boolean = false;
  companyCode: string;
  controlReqPayout: boolean = false;
  daysPolActiveToClaim: number;
  daysPremToSurr: number;
  id: number;
  payoutRatioCheck: number;
  payPremBfDue: boolean = false;
  prodClass: string;
  rowId: number;
  suspiciousPremThreshold: number;
}
