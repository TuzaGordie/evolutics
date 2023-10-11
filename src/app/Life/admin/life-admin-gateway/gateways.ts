export class GatewayEmail {
  id: number;
  rowId: number;
  password: string;
  port: string;
  protocol: string;
  senderEmail: string;
  server: string;
  authBy: string;
  authOn: string;
  active: boolean;
  effOn: string;
  secure: boolean;
  senderName: string;
  gatewayUsage: string;
}

export class GatewaySms {
  id: number;
  rowId: number;
  messagePar: string;
  mobileNoPar: string;
  password: string;
  senderName: string;
  authBy: string;
  authOn: string;
  smsUrl: string;
  username: string;
  effOn: string;
  secure: boolean;
  active: boolean;
}
