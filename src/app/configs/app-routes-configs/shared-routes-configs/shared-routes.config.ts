import {
  AppRouteBase,
  RouteItem as RouteItem,
} from 'src/app/Shared/models/RouteItem.class';

export class ReportRoutes extends AppRouteBase {
  visualize = new RouteItem('visualize', this.pub, 'id');
  edit = new RouteItem('resume', this.pub, 'id');
  hm = new RouteItem('index', this.pub);
  cr = new RouteItem('create', this.pub); 
}

export class AdminRoutes extends AppRouteBase {
  batchLog = new RouteItem('batchLog', this.pub);
  batchLogFiles = new RouteItem('batchLogFiles', this.pub);
  config = new RouteItem('config', this.pub);
  createBatch = new RouteItem('createBatch', this.pub);
  dates = new RouteItem('dates', this.pub);
  documents = new RouteItem('documents', this.pub);
  evolutics = new RouteItem('evolutics', this.pub);
  gateway = new RouteItem('gateway', this.pub);
  intRecal = new RouteItem('intRecal', this.pub);
  lottery = new RouteItem('lottery', this.pub);
  runBatch = new RouteItem('runBatch', this.pub);
  user = new RouteItem('user', this.pub);
  userGroup = new RouteItem('userGroup', this.pub);
  userMenu = new RouteItem('userMenu', this.pub);
}
export class AgentRoutes extends AppRouteBase {}
export class AssetRoutes extends AppRouteBase {
  motor = new AppRouteBase('view-asset/motor', this.pub);
  property = new AppRouteBase('view-asset/property', this.pub);
}
export class AuthorizeRoutes extends AppRouteBase {
  cap = new CAPRoutes('client-agent-policy', this.pub);
  rates = new RouteItem('rates', this.pub);
  user = new RouteItem('user', this.pub);
  setups = new RouteItem('setups', this.pub);
  workflow = new RouteItem('workflow', this.pub);
}
class CAPRoutes extends RouteItem {
  client = new RouteItem('client', this.pub);
  agent = new RouteItem('agent', this.pub);
  policy = new RouteItem('policy', this.pub);
}
export class ClientRoutes extends AppRouteBase {}
export class GroupRoutes extends AppRouteBase {
  groupSearch = new RouteItem('group-search', this.pub);
}
export class PaymentRoutes extends AppRouteBase {
  CreateCoupon = new RouteItem('create-coupon', this.pub);
  AuthorizeCoupon = new RouteItem('authorize-coupon', this.pub);
  PendingClaims = new RouteItem('pending-claims', this.pub);
  PendingPaymentOutwards = new RouteItem('pending-payment-outwards', this.pub);
  AuthorizePaymentOutward = new RouteItem(
    'authorize-payment-outward',
    this.pub
  );
  AuthorizeInwardSuspenseSwitch = new RouteItem(
    'authorize-inward-suspense',
    this.pub
  );
  AuthorizePolicyAccount = new RouteItem('authorize-policy-account', this.pub);
  AuthorizeCommissionAdjustments = new RouteItem(
    'authorize-commission-adjustments',
    this.pub
  );
  AuthorizeClaimAdjustments = new RouteItem(
    'authorize-claim-adjustments',
    this.pub
  );
  authorizeCouponCreate = new RouteItem('authorize-coupon-create', this.pub);
  agentNote = new RouteItem('agentnote', this.pub);
}
export class ProfileRoute extends AppRouteBase {}
export class QuotationRoutes extends AppRouteBase {}
export class VehicleRoutes extends AppRouteBase {
  brand = new RouteItem('brand', this.pub);
  make = new RouteItem('make', this.pub);
  model = new RouteItem('model', this.pub);
  certMgt = new RouteItem('certMgt', this.pub);
}
export class WorkflowRoutes extends AppRouteBase {
  task = new RouteItem('task', this.pub);
  schedule = new RouteItem('schedule', this.pub);
}

export class PolicyWorkflowRoute extends AppRouteBase {
  doc = new RouteItem('document', this.pub);
}
export class PolicyDeskRoute extends AppRouteBase {
  home = this.find;
  pa = new RouteItem('accounts', this.pub);
  pa2 = new RouteItem('annuities', this.pub);
  par = new RouteItem('add-rider', this.pub);
  pc = new RouteItem('commissions', this.pub);
  pcn = new RouteItem('credit-notes', this.pub); 
  pds = new RouteItem('documents', this.pub);
  pdg = new RouteItem('documents-generate', this.pub, 'number/:code/:suffix');
  pe = new RouteItem('endorsements', this.pub);
  pfa = new RouteItem('future-actions', this.pub);
  pn = new RouteItem('notes', this.pub);
  pp = new RouteItem('pricing', this.pub);
  pprls = new RouteItem('perils', this.pub);
  pr = new RouteItem('reinsurance', this.pub);
  pr2 = new RouteItem('relationships', this.pub);
  ps = new RouteItem('statemenst', this.pub);
  ptpr = new RouteItem('total-payments-received', this.pub);
  ptpo = new RouteItem('total-payments-outward', this.pub);
  pppr = new RouteItem('pending-payments-received', this.pub);
  pppo = new RouteItem('pending-payments-outward', this.pub);
  pu = new RouteItem('underwritings', this.pub);
  pw = new PolicyWorkflowRoute('workflows', this.pub);
  spl = new RouteItem('search-list', this.pub);
  vp = new RouteItem('view-policy', this.pub);
}
export class SetupRoutes extends AppRouteBase {
  rates = new RatesRoutes('rates', this.pub);
  accounts = new SetupAccountsRoutes('accounts', this.pub);
  processDes = new SetupProcessDesignRoutes('process-design', this.pub);
}
class SetupAccountsRoutes extends AppRouteBase {
  code = new AppRouteBase('code', this.pub);
  glm = new AppRouteBase('general-ledger-mapping', this.pub);
  bank = new SetupAccountsBankRouteBase('bank', this.pub);
  payOut = new AppRouteBase('payment-outward', this.pub);
  adjAccMap = new AppRouteBase('adjustment-account-mapping', this.pub);
  accLedg = new AppRouteBase('account-ledger', this.pub);
  budget = new AppRouteBase('budget', this.pub);
  transReasMap = new AppRouteBase('transaction-reason-mapping', this.pub);
  finState = new SetupAccountsFinStateRouteBase(
    'financial-statement',
    this.pub
  );
}
class SetupProcessDesignRoutes extends AppRouteBase {
  code = new AppRouteBase('code', this.pub);
  glm = new AppRouteBase('general-ledger-mapping', this.pub);
  bank = new SetupAccountsBankRouteBase('bank', this.pub);
  payOut = new AppRouteBase('payment-outward', this.pub);
  adjAccMap = new AppRouteBase('adjustment-account-mapping', this.pub);
  accLedg = new AppRouteBase('account-ledger', this.pub);
  budget = new AppRouteBase('budget', this.pub);
  transReasMap = new AppRouteBase('transaction-reason-mapping', this.pub);
  finState = new SetupAccountsFinStateRouteBase(
    'financial-statement',
    this.pub
  );
}

class SetupAccountsBankRouteBase extends AppRouteBase {
  code = new AppRouteBase('sort-code', this.pub);
  accounts = new AppRouteBase('bank-accounts', this.pub);
}
class SetupAccountsFinStateRouteBase extends AppRouteBase {
  accLine = new AppRouteBase('account-line', this.pub);
  accCls = new AppRouteBase('account-class', this.pub);
  finStat = new AppRouteBase('financial-statement', this.pub);
}
class RatesRoutes extends AppRouteBase {
  interest = new AppRouteBase('interest', this.pub);
}
