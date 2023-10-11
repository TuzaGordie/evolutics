import { IMenuItem, MenuItemDivider } from 'src/app/Shared/models/index.model';
import { appRoutes } from '../app-routes-configs/app-routes.config';
export const generalSubMenu: IMenuItem[] = [
  {
    label: 'Agent Desk',
    link: '/general/agent-desk',
    icon: 'evoicon evo-agent',
    subs: [
      {
        label: 'Overview',
        link: '/general/agent-desk/overview',
        id: 'MO171',
      },
      {
        label: 'Find Agent',
        link: '/general/agent-desk/find',
        id: 'MFA172',
      },
      {
        label: 'Create New Agent',
        link: 'agent-desk/create-index',
        id: 'MCNA173',
      },
    ],
    id: 'MAD170',
  },
  {
    label: 'Client Desk',
    link: '/general/client-desk',
    icon: 'evoicon evo-profile',
    subs: [
      {
        label: 'Overview',
        link: '/general/client-desk/overview',
        id: 'MO175',
      },
      {
        label: 'Find Client',
        link: '/general/client-desk/find',
        id: 'MFC176',
      },
      {
        label: 'Create New Client',
        link: '/general/client-desk/create',
        icon: '/general',
        subs: [
          {
            label: 'Individual',
            link: '/general/client-desk/create/individual',
            icon: '/general',
            id: 'MI178',
          },
          {
            label: 'Coporate',
            link: '/general/client-desk/create/corporate',
            icon: '/general',
            id: 'MC179',
          },
          {
            label: 'Provider',
            link: 'client-desk/create-provider-index',
            id: 'MP180',
          },
        ],
        id: 'MCNC177',
      },
    ],
    id: 'MCD174',
  },
  {
    label: 'Quotation Desk',
    link: '/general',
    icon: 'evoicon evo-multidoc',
    subs: [
      {
        label: 'Overview',
        link: '/general/quotation-desk/overview',
        id: 'MO182',
      },
      {
        label: 'Find Quote',
        link: '/general/quotation-desk/find',
        id: 'MFQ183',
      },
      {
        label: 'Create New Quotation',
        subs: [
          {
            label: 'Individual',
            link: 'quotation-desk/create-individual-quotation',
            id: 'MI185',
          },
          {
            label: 'Group',
            link: 'quotation-desk/create-group-quotation',
            id: 'MG186',
          },
        ],
        id: 'MCNQ184',
      },
    ],
    id: 'MQD181',
  },
  {
    label: 'Policy Desk',
    link: '/general/policy-desk',
    icon: 'evoicon evo-find',
    subs: [
      {
        label: 'Overview',
        link: '/general/policy-desk/overview',
        id: 'MO188',
      },
      {
        label: 'Find Policy',
        link: '/general/policy-desk/find',
        id: 'MFP189',
      },
    ],
    id: 'MPD187',
  },
  {
    label: 'Asset Desk',
    link: '/general/asset-desk',
    icon: 'fas fa-car ',
    subs: [
      {
        label: 'Overview',
        link: '/general/asset-desk/overview',
        id: 'MO191',
      },
      {
        label: 'Find Asset',
        link: '/general/asset-desk/find',
        id: 'MFA192',
      },
      {
        label: 'Create new',
        link: 'asset-desk/create',
        id: 'MCn193',
      },
    ],
    id: 'MAD190',
  },
  {
    label: 'Group Desk',
    link: '/general/group-desk',
    icon: 'evoicon evo-menu',
    subs: [
      {
        label: 'Overview',
        link: '/general/group-desk/overview',
        id: 'MO195',
      },
      {
        label: 'Find Group',
        link: '/general/group-desk/find',
        id: 'MFG196',
      },
    ],
    id: 'MGD194',
  },
  {
    label: 'Workflow Desk',
    link: '/general/workflow-desk',
    icon: 'fas fa-tasks ',
    subs: [
      {
        label: 'Overview',
        link: '/general/workflow-desk/overview',
        id: 'MO198',
      },
      {
        label: 'Find Workflow Task',
        link: '/general/workflow-desk/find',
        id: 'MFWT199',
      },
      {
        label: 'Create New',
        link: '/general/workflow-desk/create',
        icon: '/general',
        subs: [
          {
            label: 'Task',
            link: '/general/workflow-desk/task',
            icon: '/general',
            id: 'MT201',
          },
          {
            label: 'Schedule',
            link: '/general/workflow-desk/schedule',
            icon: '/general',
            id: 'MS202',
          },
        ],
        id: 'MCN200',
      },
    ],
    id: 'MWD197',
  },
  {
    label: 'Payment Desk',
    link: '/general',
    icon: 'evoicon evo-debitcards',
    subs: [
      {
        label: 'Create Coupon',
        link: '/general/payment-desk/create-coupon',
        id: 'MCC204',
      },
      {
        label: 'Authorize Coupon',
        link: '/general/payment-desk/authorize-coupon',
        id: 'MAC205',
      },
      {
        label: 'Find Expense',
        id: 'MFE206M',
      },
      {
        label: 'Find Coupon',
        id: 'MFC207M',
      },
      {
        label: 'Pending Claims',
        link: '/general/payment-desk/pending-claims',
        id: 'MPC206',
      },
      {
        label: 'Pending Payment Outwards',
        link: '/general/payment-desk/pending-payment-outwards',
        id: 'MPPO207',
      },
      {
        label: 'Authorize Payment Outwards',
        link: '/general/payment-desk/authorize-payment-outward',
        id: 'MAPO208',
      },
      {
        label: 'Authorize Inward Suspense Switch',
        link: '/general/payment-desk/authorize-inward-suspense',
        id: 'MAISS209',
      },
      {
        label: 'Authorize Policy Account',
        link: '/general/payment-desk/authorize-policy-account',
        id: 'MAPA210',
      },
      {
        label: 'Authorize Commission Adjustments',
        link: '/general/payment-desk/authorize-commission-adjustments',
        id: 'MACA211',
      },
      {
        label: 'Authorize Claim Adjustments',
        link: '/general/payment-desk/authorize-claim-adjustments',
        id: 'MACA212',
      },
      {
        label: 'Pending Authorisation Quotes',
        id: 'MPAQ213M',
      },
      {
        label: 'Quote Authorisation',
        id: 'MQA214M',
      },
      {
        label: 'Pending Reinsurance Decisions',
        id: 'MPRD215M',
      },
      {
        label: 'Reinsurance Authorisations',
        id: 'MRA216M',
      },
    ],
    id: 'MPD203',
  },
  {
    label: 'Set-ups',
    icon: 'evoicon evo-setting',
    subs: [
      {
        label: 'Accounts',
        subs: [
          {
            label: 'Account Code',
            link: 'setups/accounts/accounts/index-account',
            id: 'MAC215',
          },
          {
            label: 'General Ledger Mapping',
            link: 'setups/accounts/general-ledger-mapping/index-GLM',
            id: 'MGLM216',
          },
          {
            label: 'Bank',
            subs: [
              {
                label: 'Bank',
                link: 'setups/accounts/bank/bank',
                id: 'MB218',
              },
              {
                label: 'Sort Code',
                link: 'setups/accounts/bank/sort-code',
                id: 'MSC219',
              },
              {
                label: 'Bank Accounts',
                link: 'setups/accounts/bank/bank-accounts',
                id: 'MBA220',
              },
            ],
            id: 'MB217',
          },
          {
            label: 'Payment Outward',
            link: 'setups/accounts/payment-outward',
            id: 'MPO221',
          },
          {
            label: 'Adjustment Account Mapping',
            link: 'setups/accounts/adjustment-account-mapping',
            id: 'MAAM222',
          },
          {
            label: 'Account Ledger',
            link: 'setups/accounts/account-ledger',
            id: 'MAL223',
          },
          {
            label: 'Budget',
            link: 'setups/accounts/budget',
            id: 'MB224',
          },
          {
            label: 'Transaction Reason Mapping',
            link: 'setups/accounts/transaction-reason-mapping',
            id: 'MTRM225',
          },
          {
            label: 'Financial Statement     ',
            subs: [
              {
                label: 'Account Line',
                link: 'setups/accounts/financial-statement/account-line',
                id: 'MAL227',
              },
              {
                label: 'Account Class',
                link: 'accounts/financial-statement/account-class',
                id: 'MAC228',
              },
              {
                label: 'Financial Statement',
                link: 'setups/accounts/financial-statement/financial-statement',
                id: 'MFS229',
              },
            ],
            id: 'MFS226',
          },
        ],
        id: 'MA214',
      },
      {
        label: 'Process Design',
        subs: [
          {
            label: 'Process SetUp',
            link: 'setups/process-design/index-process-setup',
            id: 'MPS231',
          },
          {
            label: 'Process Actions',
            link: 'setups/process-design/index-process-actions',
            id: 'MPA233',
          },
          {
            label: 'Control',
            link: 'setups/process-design/index-control',
            id: 'MC232',
          },
          {
            label: 'Status',
            subs: [
              {
                label: 'Claim',
                id: 'MC235',
              },
              {
                label: 'Policy',
                id: 'MP236',
              },
              {
                label: 'Payment',
                id: 'MP237',
              },
            ],
            id: 'MS234',
          },
          {
            label: 'Process SLA',
            link: 'setups/process-design/process-SLA',
            id: 'MPS238',
          },
          {
            label: 'Clients',
            subs: [
              {
                label: 'Unique Check',
                id: 'MUC240',
              },
              {
                label: 'Mandatory Data',
                id: 'MMD241',
              },
            ],
            id: 'MC239',
          },
          {
            label: 'Requirements',
            subs: [
              {
                label: 'Claims',
                link: 'setups/process-design/requirement/claim',
                id: 'MC243',
              },
              {
                label: 'New Business',
                link: 'setups/process-design/requirement/new-business',
                id: 'MNB244',
              },
            ],
            id: 'MR242',
          },
          {
            label: 'Underwriting',
            subs: [
              {
                label: 'Requirements',
                link: 'setups/process-design/underwriting/Requirements-index',
                id: 'MR246',
              },
              {
                label: 'Table',
                link: 'setups/process-design/underwriting/Table-index',
                id: 'MT247',
              },
              {
                label: 'Questions',
                link: 'setups/process-design/underwriting/Questions-index',
                id: 'MQ248',
              },
            ],
            id: 'MU245',
          },
        ],
        id: 'MPD230',
      },
      {
        label: 'Products',
        subs: [
          {
            label: 'Cover Code',
            link: 'setups/product/product-cover-code',
            id: 'MCC250',
          },
          {
            label: 'Product Code',
            link: 'setups/product/product-code',
            id: 'MPC251',
          },
        ],
        id: 'MP249',
      },
      {
        label: 'Rates',
        subs: [
          {
            label: 'General Rates',
            link: 'setups/rates/general-rates',
            id: 'MGR253',
          },
          {
            label: 'Interest Rates',
            link: '/general/setups/rates/interest',
            id: 'MIR254',
          },
          {
            label: 'Bonus Rates',
            link: 'setups/rates/bonus-rates',
            id: 'MBR255',
          },
          {
            label: 'Discount Rates',
            link: 'setups/rates/discount-rates',
            id: 'MDR256',
          },
          {
            label: 'Tax Rates',
            link: 'setups/rates/tax-rates',
            id: 'MTR257',
          },
          {
            label: 'Short Term Rates',
            link: 'setups/rates/short-term-rates',
            id: 'MSTR258',
          },
        ],
        id: 'MR252',
      },
      {
        label: 'Correspondence',
        subs: [
          {
            label: 'Quotation',
            link: 'setups/correspondence/index-quotation',
            id: 'MQ260',
          },
          {
            label: 'Email',
            link: 'setups/correspondence/index-email',
            id: 'ME261',
          },
          {
            label: 'Print',
            link: 'setups/correspondence/index-print',
            id: 'MP262',
          },
          {
            label: 'SMS',
            link: 'setups/correspondence/index-sms',
            id: 'MSF263',
          },
          {
            label: 'Feed',
            link: 'setups/correspondence/feed',
            id: 'MF264M',
          },

          {
            label: 'Webhook',
            link: 'setups/correspondence/index-webhook',
            id: 'MW264',
          },
          {
            label: 'Template',
            link: 'setups/correspondence/index-template',
            id: 'MT265',
          },
        ],
        id: 'MC259',
      },
      {
        label: 'Code',
        subs: [
          {
            label: 'Parameters',
            link: 'setups/code/index-parameters',
            id: 'MP267',
          },
          {
            label: 'Premium Frequencies',
            link: 'setups/code/index-premfreq',
            id: 'MPF268',
          },
          {
            label: 'Premium Payment Method',
            link: 'setups/code/index-prempaymthd',
            id: 'MPPM269',
          },
          {
            label: 'Numbering',
            link: 'setups/code/index-numbering',
            id: 'MN270',
          },
          {
            label: 'Currency',
            subs: [
              {
                label: 'Code',
                link: 'setups/code/currency/code/index',
                id: 'MC272',
              },
              {
                label: 'Rate',
                link: 'setups/code/currency/rate/index',
                id: 'MR273',
              },
            ],
            id: 'MC271',
          },
          {
            label: 'Lottery',
            link: 'setups/code/lottery',
            id: 'ML274',
          },
          {
            label: 'Vehicle',
            subs: [
              {
                label: 'Brand',
                link: 'setups/code/vehicle-brand-index',
                id: 'MB276',
              },
              {
                label: 'Make',
                link: 'setups/code/vehicle-make-index',
                id: 'MM277',
              },
              {
                label: 'Model',
                link: 'setups/code/vehicle-model-index',
                id: 'MM278',
              },
              {
                label: 'Cert Mgt',
                link: 'setups/code/vehicle-cert-index',
                id: 'MCM279',
              },
            ],
            id: 'MV275',
          },
        ],
        id: 'MC266',
      },
      {
        label: 'Translations',
        subs: [
          {
            label: 'Menu',
            link: 'setups/translations/index-menu',
            id: 'MM281',
          },
          {
            label: 'Template',
            link: 'setups/translations/index-template',
            id: 'MT282',
          },
          {
            label: 'Auto Translator',
            id: 'MAT283',
          },
          {
            label: 'System Message',
            link: 'setups/translations/index-system-message',
            id: 'MSM284',
          },
        ],
        id: 'MT280',
      },
      {
        label: 'Organization',
        subs: [
          {
            label: 'Appraisal',
            subs: [
              {
                label: 'Individual',
                link: 'setups/organization/index-individual-appraisal',
                id: 'MI287',
              },
              {
                label: 'Team',
                link: 'setups/organization/index-team-appraisal',
                id: 'MT288',
              },
              {
                label: 'Sub Division',
                link: 'setups/organization/index-subdivision-appraisal',
                id: 'MSD289',
              },
              {
                label: 'Division',
                link: 'setups/organization/index-division-appraisal',
                id: 'MD290',
              },
              {
                label: 'Company',
                link: 'setups/organization/index-company-appraisal',
                id: 'MC291',
              },
              {
                label: 'Criteria',
                link: 'setups/organization/index-criteria-appraisal',
                id: 'MC292',
              },
            ],
            id: 'MA286',
          },
          {
            label: 'Branches',
            link: 'setups/organization/index-branches',
            id: 'MB293',
          },
          {
            label: 'Companies',
            link: 'setups/organization/index-company-org',
            id: 'MC294',
          },
        ],
        id: 'MO285',
      },
      {
        label: 'Address',
        subs: [
          {
            label: 'Country',
            link: 'setups/address/index-country',
            id: 'MC296',
          },
          {
            label: 'Region',
            link: 'setups/address/index-region',
            id: 'MR297',
          },
          {
            label: 'State',
            link: 'setups/address/index-state',
            id: 'MS298',
          },
          {
            label: 'Town',
            link: 'setups/address/index-town',
            id: 'MT299',
          },
        ],
        id: 'MA295',
      },
      {
        label: 'Agents',
        subs: [
          {
            label: 'Agent Type',
            link: 'setups/agents/index-agent-type',
            id: 'MAT301',
          },
          {
            label: 'Band',
            link: 'setups/agents/index-agent-band',
            id: 'MB302',
          },
          {
            label: 'Product Grouping',
            link: 'setups/agents/index-product-grouping',
            id: 'MPG303',
          },
          {
            label: 'Commission Code',
            link: 'setups/agents/index-commission-code',
            id: 'MCC304',
          },
          {
            label: 'Agent Loan Type',
            link: 'setups/agents/index-agent-loan',
            id: 'MALT305',
          },
        ],
        id: 'MA300',
      },
      {
        label: 'Task Set up',
        link: 'setups/task-setup/index',
        id: 'MTSu306',
      },
      {
        label: 'Tariffs',
        link: 'setups/tariff/index-tariff',
        id: 'MT307',
      },
      {
        label: 'Reinsurance',
        subs: [
          {
            label: 'Treaties',
            link: 'setups/reinsurance/index-treaties',
            id: 'MT309',
          },
          {
            label: 'Profit Sharing',
            link: 'setups/reinsurance/profit-sharing-index',
            id: 'MPS310',
          },
        ],
        id: 'MR308',
      },
    ],
    id: 'MS213',
  },
  {
    label: 'Reports',
    icon: 'evoicon evo-blankdoc',
    subs: [
      {
        label: 'Create/Run',
        link: 'report',
        id: 'MC312',
      },
      {
        label: 'Batch',
        link: 'report/batch',
        id: 'MB313',
      },
    ],
    id: 'MR311',
  },
  {
    label: 'Admin',
    link: '/general/admin-desk',
    icon: 'evoicon evo-admin',
    subs: [
      {
        label: 'User',
        link: '/general/admin-desk/user/index',
        subs: [
          {
            label: 'User',
            link: '/general/admin-desk/user/index',
            id: 'MU316',
          },
          {
            label: 'User Group',
            link: '/general/admin-desk/userGroup',
            id: 'MUG317',
          },
          {
            label: 'User Menu',
            link: '/general/admin-desk/userMenu',
            id: 'MUM318',
          },
        ],
        id: 'MU315',
      },
      {
        label: 'Dates',
        subs: [
          {
            label: 'Dates',
            link: 'admin-desk/dates',
            id: 'MD320',
          },
          {
            label: 'Holidays',
            id: 'MH321',
          },
        ],
        id: 'MD319',
      },
      {
        label: 'Authorize',
        link: '/general/authorize',
        icon: 'fas fa-user-lock ',
        subs: [
          {
            label: 'Setups',
            link: '/general/authorize/setups',
            id: 'MS323',
          },
          {
            label: 'User',
            link: '/general/authorize/user',
            id: 'MU324',
          },
          {
            label: 'Rates',
            link: '/general/authorize/rates',
            id: 'MR325',
          },
          {
            label: 'Client-Agent-Policy',
            link: '/general/authorize/client-agent-policy',
            subs: [
              {
                label: 'Client',
                link: '/general/authorize/client-agent-policy/client',
                id: 'MC327',
              },
              {
                label: 'Agent',
                link: '/general/authorize/client-agent-policy/agent',
                id: 'MA328',
              },
              {
                label: 'Policy',
                link: '/general/authorize/client-agent-policy/policy',
                id: 'MP329',
              },
            ],
            id: 'MC326',
          },
          {
            label: 'WorkFlow',
            link: '/general/authorize/workflow',
            id: 'MW330',
          },
        ],
        id: 'MA322',
      },
      {
        label: 'Create Batch',
        link: '/general/admin-desk/createBatch',
        id: 'MCB331',
      },
      {
        label: 'Run Batch',
        link: '/general/admin-desk/runBatch',
        id: 'MRB332',
      },
      {
        label: 'Batch Log',
        link: '/general/admin-desk/batchLog',
        id: 'MBL333',
      },
      {
        label: 'Batch Log Files',
        link: '/general/admin-desk/batchLogFiles',
        id: 'MBLF334',
      },
      {
        label: 'Interest Recalculation',
        link: '/general/admin-desk/intRecal',
        id: 'MIR335',
      },
      {
        label: 'Configuration',
        link: '/general/admin-desk/config',
        id: 'MC336',
      },
      {
        label: 'Documents',
        link: '/general/admin-desk/documents',
        id: 'MD337',
      },
      {
        label: 'Gateway',
        link: '/general/admin-desk/gateway',
        id: 'MG338',
      },
      {
        label: 'Lottery',
        link: '/general/admin-desk/lottery',
        id: 'ML339',
      },
      {
        label: 'Evolutics',
        link: '/general/admin-desk/evolutics',
        id: 'ME340',
      },
    ],
    id: 'MA314',
  },
];
