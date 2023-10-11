import {IMenuItem, MenuItemDivider} from 'src/app/Shared/models/index.model';
import {appRoutes} from '../app-routes-configs/app-routes.config';

export const actuarialSubMenu: IMenuItem[] = [
  {
    label: 'Operations  Desk',
    subs: [
      {
        label: 'Find Policy',
        link: 'policy-desk/find',
        id: 'MFP483',
      },
      {
        label: 'Find Agent',
        link: 'agent-desk/find',
        id: 'MFA484',
      },
      {
        label: 'Find Client',
        link: 'client-desk/find',
        id: 'MFC484M',
      },
      {
        label: 'Quotations',
        link: 'quotation',
        id: 'MQ485',
      },
    ],
    id: 'MOD482',
  },
  {
    label: 'Risk  Modelling  Desk',
    subs: [
      {
        label: 'Probability Distribution',
        subs: [
          {
            label: 'Life',
            link: 'risk/prob/life',
            id: 'ML490',
          },
          {
            label: 'General Business',
            id: 'MGB491',
          },
          {
            label: 'Health',
            id: 'MH492',
          },
        ],
        id: 'MPD489',
      },
      {
        label: 'Experience Analysis',
        subs: [
          {
            label: '',
            id: 'M494',
          },
          {
            label: '',
            id: 'M495',
          },
        ],
        id: 'MEA493',
      },
      {
        label: 'Expense Analysis',
        subs: [
          {
            label: '',
            id: 'M497',
          },
          {
            label: '',
            id: 'M498',
          },
        ],
        id: 'MEA496',
      },
      {
        label: 'Customer Behaviour',
        subs: [
          {
            label: '',
            id: 'M500',
          },
          {
            label: '',
            id: 'M501',
          },
        ],
        id: 'MCB499',
      },
      {
        label: 'Reserves',
        subs: [
          {
            label: '',
            id: 'M503',
          },
          {
            label: '',
            id: 'M504',
          },
        ],
        id: 'MR502',
      },
      {
        label: 'Reinsurance',
        subs: [
          {
            label: '',
            id: 'M506',
          },
          {
            label: '',
            id: 'M507',
          },
        ],
        id: 'MR505',
      },
    ],
    id: 'MRMD488',
  },
  {
    label: 'Pricing  Desk',
    subs: [
      {
        label: 'Life',
        id: 'ML509',
      },
      {
        label: 'General',
        id: 'MG510',
      },
      {
        label: 'Health',
        id: 'MH511',
      },
    ],
    id: 'MPD508',
  },
  {
    label: 'Valuation  Desk',
    subs: [
      {
        label: 'Liability',
        subs: [
          {
            label: 'Life',
            subs: [
              {
                label: 'Parameters',
                link: 'liability/life',
                id: 'MP515',
              },
              {
                label: 'Run',
                link: 'liability/life/run',
                id: 'MR516',
              },
              {
                label: 'Result',
                link: 'liability/life/result',
                id: 'MR517',
              },
            ],
            id: 'ML514',
          },
          {
            label: 'General',
            link: 'liability/general',
            id: 'MG518',
          },
          {
            label: 'Health',
            link: 'liability/health',
            id: 'MH519',
          },
        ],
        id: 'ML513',
      },
      {
        label: 'Assets',
        subs: [
          {
            label: 'Life',
            id: 'ML521',
          },
          {
            label: 'General',
            id: 'MG522',
          },
          {
            label: 'Health',
            id: 'MH523',
          },
        ],
        id: 'MA520',
      },
    ],
    id: 'MVD512',
  },
  {
    label: 'Capital  Desk',
    subs: [
      {
        label: 'Regulatory',
        id: 'MR525',
      },
      {
        label: 'Economic',
        id: 'ME526',
      },
    ],
    id: 'MCD524',
  },
  {
    label: 'Workflow  Desk',
    icon: 'fas fa-tasks ',
    subs: [
      {
        label: 'Overview',
        link: 'workflow-desk/overview',
        id: 'MO528',
      },
      {
        label: 'Find Workflow task',
        link: 'workflow-desk/find',
        id: 'MFWt529',
      },
      {
        label: 'Create New',
        subs: [
          {
            label: 'Task',
            link: 'workflow-desk/task',
            id: 'MT531',
          },
          {
            label: 'Schedule',
            link: 'workflow-desk/schedule',
            id: 'MS532',
          },
        ],
        id: 'MCN530',
      },
    ],
    id: 'MWD527',
  },
  {
    label: 'Finance  Desk',
    subs: [
      {
        label: 'View Financial Statement',
        id: 'MVFS534',
      },
      {
        label: 'View Ledgers',
        id: 'MVL535',
      },
      {
        label: 'View Expense Allocation',
        id: 'MVEA536',
      },
      {
        label: 'Cost Centres',
        id: 'MCC537',
      },
    ],
    id: 'MFD533',
  },
  {
    label: 'Set-ups',
    icon: 'evoicon evo-setting',
    subs: [
      {
        label: 'Products',
        subs: [
          {
            label: 'Cover Code',
            link: 'setups/product/product-cover-code',
            id: 'MCC548M',
          },
          {
            label: 'Product Code',
            link: 'setups/product/product-code',
            id: 'MPC549M',
          },
        ],
        id: 'MP547',
      },
      {
        label: 'RC Parameters',
        id: 'MRP548',
      },
      {
        label: 'EC Parameters',
        subs: [
          {
            label: 'Cover Code',
            link: 'setups/product-cover-code',
            id: 'MCC550',
          },
          {
            label: 'Product Code',
            link: 'setups/product-code',
            id: 'MPC551',
          },
        ],
        id: 'MEP549',
      },

      {
        label: 'IFRS',
        subs: [
          {
            label: 'Contract Grouping',
            link: 'setup/ifrs/contract-grouping',
            id: 'MCG539',
          },
          {
            label: 'Approach Mapping',
            link: 'setup/ifrs/approach-mapping',
            id: 'MAM542',
          },
          {
            label: 'Coverage Period',
            id: 'MCP543',
          },
          {
            label: 'Risk Adjustment',
            id: 'MRA544',
            link: 'setup/ifrs/risk-adjustment',
          },
          {
            label: 'Discount',
            link: 'setup/ifrs/discount',
            id: 'MD545',
          },
        ],
        id: 'MI538',
      },
      {
        label: 'Expense Allocation',
        id: 'MEA552',
      },
      {
        label: 'SLA',
        id: 'MS553',
      },
      {
        label: 'Workflow Task',
        link: 'setups/task-setup/index',
        id: 'MWT554',
      },
      {
        label: 'Codes',
        id: 'MC555',
        subs: [
          {
            label: 'List Values',
            link: 'setups/code/index-parameters',
            id: 'MC556M',
          },
          {
            label: 'Life Expectancy',
            link: '/actuarial/setup/codes/life-expectancy',
            id: 'MCC557M',
          },
        ],
      },
    ],
    id: 'MS546',
  },
  {
    label: 'Reports',
    icon: 'evoicon evo-blankdoc',
    subs: [
      {
        label: 'Create/Run',
        link: 'report',
        id: 'MC557',
      },
      {
        label: 'Batch',
        link: 'report/batch',
        id: 'MB558',
      },
    ],
    id: 'MR556',
  },
  {
    label: 'Admin',
    icon: 'evoicon evo-admin',
    subs: [
      {
        label: 'Users',
        link: 'admin-desk/user/index',
        id: 'MU560',
      },
      {
        label: 'Users Group',
        link: 'admin-desk/userGroup',
        id: 'MUG561',
      },
      {
        label: 'Authorize',
        id: 'MA562',
      },
      {
        label: 'User Menu',
        link: 'admin-desk/userMenu',
        id: 'MUM563',
      },
      {
        label: 'Authorizations',
        link: 'admin/batchlog',
        id: 'MA564',
      },
      {
        label: 'Configurations',
        link: 'admin/interestcalculation',
        id: 'MC565',
      },
    ],
    id: 'MA559',
  },
];
