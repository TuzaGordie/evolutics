import { AppRouteBase, RouteItem } from 'src/app/Shared/models/RouteItem.class';
// import '../../prototypes/prototypes';
import {
  ReportRoutes,
  SetupRoutes,
  PolicyDeskRoute,
  AgentRoutes,
  ClientRoutes,
  QuotationRoutes,
  GroupRoutes,
  WorkflowRoutes,
  PaymentRoutes,
  AdminRoutes,
  AssetRoutes,
  AuthorizeRoutes,
  ProfileRoute,
  VehicleRoutes,
} from './shared-routes-configs/shared-routes.config';

class LifeRoutes extends AppRouteBase {
  admin = new AdminRoutes('admin-desk', this.pub);
  agent = new AgentRoutes('agent-desk', this.pub);
  authorize = new AuthorizeRoutes('authorize', this.pub);
  client = new ClientRoutes('client-desk', this.pub);
  group = new GroupRoutes('group-desk', this.pub);
  payment = new PaymentRoutes('payment-desk', this.pub);
  policy = new PolicyDeskRoute('policy-desk', this.pub);
  profile = new ProfileRoute('profile', this.pub);
  quotation = new QuotationRoutes('quotation-desk', this.pub);
  report = new ReportRoutes('report', this.pub);
  setup = new SetupRoutes('setups', this.pub);
  workflow = new WorkflowRoutes('workflow-desk', this.pub);
}
class FinanceRoutes extends AppRouteBase {
  admin = new AdminRoutes('admin-desk', this.pub);
  agent = new AgentRoutes('agent-desk', this.pub);
  asset = new AssetRoutes('asset-desk', this.pub);
  client = new ClientRoutes('client-desk', this.pub);
  payment = new PaymentRoutes('payment-desk', this.pub);
  policy = new PolicyDeskRoute('policy-desk', this.pub);
  report = new ReportRoutes('report', this.pub);
  workflow = new WorkflowRoutes('workflow-desk', this.pub);
}
class GeneralRoutes extends AppRouteBase {
  admin = new AdminRoutes('admin-desk', this.pub);
  agent = new AgentRoutes('agent-desk', this.pub);
  asset = new AssetRoutes('asset-desk', this.pub);
  authorize = new AuthorizeRoutes('authorize', this.pub);
  client = new ClientRoutes('client-desk', this.pub);
  group = new GroupRoutes('group-desk', this.pub);
  payment = new PaymentRoutes('payment-desk', this.pub);
  policy = new PolicyDeskRoute('policy-desk', this.pub);
  quotation = new QuotationRoutes('quotation-desk', this.pub);
  report = new ReportRoutes('report', this.pub);
  setup = new SetupRoutes('setups', this.pub);
  vehicle = new VehicleRoutes('vehicle', this.pub);
  workflow = new WorkflowRoutes('workflow-desk', this.pub);
}
class DocumentRoutes extends AppRouteBase { 
  authorize = new AuthorizeRoutes('authorize', this.pub); 
  workflow = new WorkflowRoutes('workflow-desk', this.pub); 
  setup = new SetupRoutes('setup', this.pub); 
}
class AuthRoutes extends AppRouteBase {
  disabled = new RouteItem('disabled', this.pub);
  forgotPwd = new RouteItem('forgot-password', this.pub);
  locked = new RouteItem('locked', this.pub);
  userVerify = new RouteItem('userVerify', this.pub);
  login = new RouteItem('login', this.pub);
  logout = new RouteItem('logout', this.pub);
  register = new RouteItem('register', this.pub);
}
class AppRoute extends AppRouteBase {
  life = new LifeRoutes('life');
  general = new GeneralRoutes('general');
  health = new LifeRoutes('health');
  act = new LifeRoutes('actuarial');
  crm = new LifeRoutes('crms');
  analytics = new LifeRoutes('analytics');
  assets = new LifeRoutes('assets');
  finance = new FinanceRoutes('finance');
  cash = new LifeRoutes('cash');
  document = new DocumentRoutes('document');
  dbcloner = new LifeRoutes('dbcloner');
  human = new LifeRoutes('human');
  auth = new AuthRoutes('auth');

  profile = new ProfileRoute('profile', this.pub);

  help = new RouteItem('help');
  p404 = new RouteItem('404');
  p401 = new RouteItem('401');
  about = new RouteItem('about');
  contact = new RouteItem('contact');
  clearData = new RouteItem('clear-data');
  dashboard = new RouteItem('dashboard');
  redirectD = new RouteItem('rd');
  redirectS = new RouteItem('rs');
  tos = new RouteItem('tos');
  pp = new RouteItem('pp');
}
export const appRoutes = new AppRoute('/');
console.log(appRoutes);
