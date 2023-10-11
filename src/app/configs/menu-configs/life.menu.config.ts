import { IMenuItem, MenuItemDivider } from 'src/app/Shared/models/index.model';
import { appRoutes } from '../app-routes-configs/app-routes.config';

export const lifeSubMenu: IMenuItem[] = [
  {
    label: 'Agent Desk',
    link: 'agent-desk',
    icon: 'evoicon evo-agent',
    subs: [
      {
        label: 'Overview',
        link: 'agent-desk/overview',
        id: 'MO3',
      },
      {
        label: 'Find Agent',
        link: 'agent-desk/find',
        id: 'MFA4',
      },
      {
        label: 'Create New Agent',
        link: 'agent-desk/create-index',
        id: 'MCNA5',
      },
    ],
    id: 'MAD2',
  },
  {
    label: 'Client Desk',
    link: 'client-desk',
    icon: 'evoicon evo-profile',
    subs: [
      {
        label: 'Overview',
        link: 'client-desk/overview',
        id: 'MO7',
      },
      {
        label: 'Find Client',
        link: 'client-desk/find',
        id: 'MFC8',
      },
      {
        label: 'Create New Client',
        subs: [
          {
            label: 'Individual',
            link: 'client-desk/create/individual',
            id: 'MI10',
          },
          {
            label: 'Corporate',
            link: '/life/client-desk/create/corporate',
            id: 'MC11',
          },
          {
            label: 'Provider',
            link: 'client-desk/create-provider-index',
            id: 'MP12',
          },
        ],
        id: 'MCNC9',
      },
      {
        label: 'Web User',
        subs: [
          {
            label: 'Find',
            link: 'client-desk/web-user-find',
            id: 'MF14',
          },
          {
            label: 'Create New',
            id: 'MCN15',
          },
        ],
        id: 'MWU13',
      },
    ],
    id: 'MCD6',
  },
  {
    label: 'Quotation Desk',
    link: 'quotation-desk',
    icon: 'evoicon evo-multidoc',
    subs: [
      {
        label: 'Overview',
        link: 'quotation-desk/overview',
        id: 'MO17',
      },
      {
        label: 'Find Quote',
        link: 'quotation-desk/find',
        id: 'MFQ18',
      },
      {
        label: 'Create New Quote',
        link: 'quotation-desk/create',
        subs: [
          {
            label: 'Individual',
            link: 'quotation-desk/create/individual',
            id: 'MI20',
          },
          {
            label: 'Group',
            link: 'quotation-desk/create-group-quotation',
            id: 'MG21',
          },
        ],
        id: 'MCNQ19',
      },
    ],
    id: 'MQD16',
  },
  {
    label: 'Policy Desk',
    link: 'policy-desk',
    icon: 'evoicon evo-find',
    subs: [
      {
        label: 'Overview',
        link: 'policy-desk/overview',
        id: 'MO23',
      },
      {
        label: 'Find Policy',
        link: 'policy-desk/find',
        id: 'MFP24',
      },
    ],
    id: 'MPD22',
  },
  {
    label: 'Group Desk',
    link: 'group-desk',
    icon: 'evoicon evo-menu',
    subs: [
      {
        label: 'Overview',
        link: 'group-desk/overview',
        id: 'MO26',
      },
      {
        label: 'Find Group',
        link: 'group-desk/find',
        id: 'MFG27',
      },
    ],
    id: 'MGD25',
  },
  {
    label: 'Workflow Desk',
    link: 'workflow-desk',
    icon: 'fas fa-tasks ',
    subs: [
      {
        label: 'Overview',
        link: 'workflow-desk/overview',
        id: 'MO29',
      },
      {
        label: 'Find Workflow Task',
        link: 'workflow-desk/find',
        id: 'MFWT30',
      },
      {
        label: 'Create New',
        link: 'workflow-desk/create',
        subs: [
          {
            label: 'Task',
            link: 'workflow-desk/task',
            id: 'MT32',
          },
          {
            label: 'Schedule',
            link: 'workflow-desk/schedule',
            id: 'MS33',
          },
        ],
        id: 'MCN31',
      },
    ],
    id: 'MWD28',
  },
  {
    label: 'Payment Desk',
    link: 'payment-desk',
    icon: 'evoicon evo-debitcards',
    subs: [
      {
        label: 'Create Coupon',
        link: 'payment-desk/create-coupon',
        id: 'MCC35',
      },
      {
        label: 'Authorize Coupon',
        link: 'payment-desk/authorize-coupon',
        id: 'MAC36',
      },
      {
        label: 'Find Expense',
        id: 'MFE37M',
        link: 'payment-desk/find-expense',
      },
      {
        label: 'Find Coupon',
        id: 'MFC38M',
        link: 'payment-desk/find-coupon',
      },
      {
        label: 'Pending Claims',
        link: 'payment-desk/pending-claims',
        id: 'MPC37',
      },
      {
        label: 'Pending Payment Outwards',
        link: 'payment-desk/pending-payment-outwards',
        id: 'MPPO38',
      },
      {
        label: 'Authorize Payment Outwards',
        link: 'payment-desk/authorize-payment-outward',
        id: 'MAPO39',
      },
      {
        label: 'Authorize Inward Suspense Switch',
        link: 'payment-desk/authorize-inward-suspense',
        id: 'MAISS40',
      },
      {
        label: 'Authorize Policy Account',
        link: 'payment-desk/authorize-policy-account',
        id: 'MAPA41',
      },
      {
        label: 'Authorize Commission Adjustments',
        link: 'payment-desk/authorize-commission-adjustments',
        id: 'MACA42',
      },
      {
        label: 'Authorize Claim Adjustments',
        link: 'payment-desk/authorize-claim-adjustments',
        id: 'MACA43',
      },
      {
        label: 'Pending Authorisation Quotes',
        id: 'MPAQ44M',
      },
      {
        label: 'Quote Authorisation',
        id: 'MQA45M',
        link: '/life/payment-desk/quote-authorization',
      },
      {
        label: 'Pending Reinsurance Decisions',
        id: 'MPRD46M',
        link: '/life/payment-desk/pending-reinsurance-decisions',
      },
      {
        label: 'Reinsurance Authorisation',
        id: 'MRA47M',
        link: '/life/payment-desk/reinsurance-authorizations',
      },
      {
        label: 'DV Authorisation',
        id: 'MDA48M',
        link: '/life/payment-desk/dv-authorizations',
      },
    ],
    id: 'MPD34',
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
            id: 'MAC46',
          },
          {
            label: 'General Ledger Mapping',
            link: 'setups/accounts/general-ledger-mapping/index-GLM',
            id: 'MGLM47',
          },
          {
            label: 'Bank',
            subs: [
              {
                label: 'Local Bank List',
                link: 'setups/accounts/bank/bank',
                id: 'MLBL49',
              },
              {
                label: 'Sort Code',
                link: 'setups/accounts/bank/sort-code',
                id: 'MSC50',
              },
              {
                label: 'Bank Accounts',
                link: 'setups/accounts/bank/bank-accounts',
                id: 'MBA51',
              },
            ],
            id: 'MB48',
          },
          {
            label: 'Payment Outward',
            link: 'setups/accounts/payment-outward',
            id: 'MPO52',
          },
          {
            label: 'Adjustment Account Mapping',
            link: 'setups/accounts/adjustment-account-mapping',
            id: 'MAAM53',
          },
          {
            label: 'Account Ledger',
            link: 'setups/accounts/account-ledger',
            id: 'MAL54',
          },
          {
            label: 'Budget',
            link: 'setups/accounts/budget',
            id: 'MB55',
          },
          {
            label: 'Transaction Reason Mapping',
            link: 'setups/accounts/transaction-reason-mapping',
            id: 'MTRM56',
          },
          {
            label: 'Financial Statement',
            subs: [
              {
                label: 'Account Line',
                link: 'setups/accounts/financial-statement/account-line/create',
                id: 'MAL58',
              },
              {
                label: 'Account Class',
                link: 'setups/accounts/financial-statement/account-class',
                id: 'MAC59',
              },
              {
                label: 'Financial Statement',
                link: 'setups/accounts/financial-statement/financial-statement/create',
                id: 'MFS60',
              },
            ],
            id: 'MFS57',
          },
        ],
        id: 'MA45',
      },
      {
        label: 'Process Design',
        subs: [
          {
            label: 'Process SetUp',
            link: 'setups/process-design/index-process-setup',
            id: 'MPS62',
          },
          {
            label: 'Process Actions',
            link: 'setups/process-design/index-process-actions',
            id: 'MPA64',
          },
          {
            label: 'Control',
            link: 'setups/process-design/index-control',
            id: 'MC63',
          },
          {
            label: 'Status',
            subs: [
              {
                label: 'Claim',
                link: 'setups/process-design/status/claim-index',
                id: 'MC66',
              },
              {
                label: 'Policy',
                link: 'setups/process-design/status/policy-index',
                id: 'MP67',
              },
              {
                label: 'Payment',
                link: 'setups/process-design/status/payment-index',
                id: 'MP68',
              },
            ],
            id: 'MS65',
          },
          {
            label: 'Process SLA',
            link: 'setups/process-design/process-SLA',
            id: 'MPS69',
          },
          {
            label: 'Clients',
            subs: [
              {
                label: 'Unique Check',
                id: 'MUC71',
              },
              {
                label: 'Mandatory Data',
                id: 'MMD72',
              },
            ],
            id: 'MC70',
          },
          {
            label: 'Requirements',
            subs: [
              {
                label: 'Claims',
                link: 'setups/process-design/requirement/claim',
                id: 'MC74',
              },
              {
                label: 'New Business',
                link: 'setups/process-design/requirement/new-business',
                id: 'MNB75',
              },
            ],
            id: 'MR73',
          },
          {
            label: 'Underwriting',
            subs: [
              {
                label: 'Requirements',
                link: 'setups/process-design/underwriting/Requirements-index',
                id: 'MR77',
              },
              {
                label: 'Table',
                link: 'setups/process-design/underwriting/Table-index',
                id: 'MT78',
              },
              {
                label: 'Questions',
                link: 'setups/process-design/underwriting/Questions-index',
                id: 'MQ79',
              },
              {
                label: 'Loadings',
                link: 'setups/process-design/underwriting/loadings-index',
                id: 'ML80M',
              },
            ],
            id: 'MU76',
          },
        ],
        id: 'MPD61',
      },
      {
        label: 'Products',
        subs: [
          {
            label: 'Cover Code',
            link: 'setups/product/product-cover-code',
            id: 'MCC81',
          },
          {
            label: 'Product Code',
            link: 'setups/product/product-code',
            id: 'MPC82',
          },
        ],
        id: 'MP80',
      },
      {
        label: 'Rates',
        subs: [
          {
            label: 'General Rates',
            link: 'setups/rates/general-rates',
            id: 'MGR84',
          },
          {
            label: 'Interest Rates',
            link: 'setups/rates/interest',
            id: 'MIR85',
          },
          {
            label: 'Bonus Rates',
            link: 'setups/rates/bonus-rates',
            id: 'MBR86',
          },
          {
            label: 'Discount Rates',
            link: 'setups/rates/discount-rates',
            id: 'MDR87',
          },
          {
            label: 'Tax Rates',
            link: 'setups/rates/tax-rates',
            id: 'MTR88',
          },
          {
            label: 'Short Term Rates',
            link: 'setups/rates/short-term-rates',
            id: 'MSTR89',
          },
        ],
        id: 'MR83',
      },
      {
        label: 'Correspondence',
        subs: [
          {
            label: 'Quotation',
            link: 'setups/correspondence/index-quotation',
            id: 'MQ91',
          },
          {
            label: 'Email',
            link: 'setups/correspondence/index-email',
            id: 'ME92',
          },
          {
            label: 'Print',
            link: 'setups/correspondence/index-print',
            id: 'MP93',
          },
          {
            label: 'SMS',
            link: 'setups/correspondence/index-sms',
            id: 'MS94',
          },
          {
            label: 'Feed',
            link: 'setups/correspondence/feed',
            id: 'MF95M',
          },
          {
            label: 'Webhook',
            link: 'setups/correspondence/index-webhook',
            id: 'MW95',
          },
          {
            label: 'Template',
            link: 'setups/correspondence/index-template',
            id: 'MT96',
          },
        ],
        id: 'MC90',
      },
      {
        label: 'Code',
        subs: [
          {
            label: 'Parameters',
            link: 'setups/code/index-parameters',
            id: 'MP98',
          },
          {
            label: 'Premium Frequencies',
            link: 'setups/code/index-premfreq',
            id: 'MPF99',
          },
          {
            label: 'Premium Payment Method',
            link: 'setups/code/index-prempaymthd',
            id: 'MPPM100',
          },
          {
            label: 'Numbering',
            link: 'setups/code/index-numbering',
            id: 'MN101',
          },
          {
            label: 'Currency',
            subs: [
              {
                label: 'Code',
                link: 'setups/code/currency/code/index',
                id: 'MC103',
              },
              {
                label: 'Rate',
                link: 'setups/code/currency/rate/index',
                id: 'MR104',
              },
            ],
            id: 'MC102',
          },
          {
            label: 'Lottery',
            link: 'setups/code/lottery',
            id: 'ML105',
          },
          {
            label: 'File Format',
            link: 'setups/code/file-format',
            id: 'MFF106M',
          },
        ],
        id: 'MC97',
      },
      {
        label: 'Translations',
        subs: [
          {
            label: 'Menu',
            link: 'setups/translations/index-menu',
            id: 'MM107',
          },
          {
            label: 'Template',
            link: 'setups/translations/index-template',
            id: 'MT108',
          },
          {
            label: 'Auto Translator',
            id: 'MAT109',
          },
          {
            label: 'System Message',
            link: 'setups/translations/index-system-message',
            id: 'MSM110',
          },
        ],
        id: 'MT106',
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
                id: 'MI113',
              },
              {
                label: 'Team',
                link: 'setups/organization/index-team-appraisal',
                id: 'MT114',
              },
              {
                label: 'Sub Division',
                link: 'setups/organization/index-subdivision-appraisal',
                id: 'MSD115',
              },
              {
                label: 'Division',
                link: 'setups/organization/index-division-appraisal',
                id: 'MD116',
              },
              {
                label: 'Company',
                link: 'setups/organization/index-company-appraisal',
                id: 'MC117',
              },
              {
                label: 'Criteria',
                link: 'setups/organization/index-criteria-appraisal',
                id: 'MC118',
              },
            ],
            id: 'MA112',
          },
          {
            label: 'Branches',
            link: 'setups/organization/index-branches',
            id: 'MB119',
          },
          {
            label: 'Companies',
            link: 'setups/organization/index-company-org',
            id: 'MC120',
          },
        ],
        id: 'MO111',
      },
      {
        label: 'Address',
        subs: [
          {
            label: 'Country',
            link: 'setups/address/index-country',
            id: 'MC122',
          },
          {
            label: 'Region',
            link: 'setups/address/index-region',
            id: 'MR123',
          },
          {
            label: 'State',
            link: 'setups/address/index-state',
            id: 'MS124',
          },
          {
            label: 'Town',
            link: 'setups/address/index-town',
            id: 'MT125',
          },
        ],
        id: 'MA121',
      },
      {
        label: 'Agents',
        subs: [
          {
            label: 'Agent Type',
            link: 'setups/agents/index-agent-type',
            id: 'MAT127',
          },
          {
            label: 'Band',
            link: 'setups/agents/index-agent-band',
            id: 'MB128',
          },
          {
            label: 'Product Grouping',
            link: 'setups/agents/index-product-grouping',
            id: 'MPG129',
          },
          {
            label: 'Commission Code',
            link: 'setups/agents/index-commission-code',
            id: 'MCC130',
          },
          {
            label: 'Agent Loan Type',
            link: 'setups/agents/index-agent-loan',
            id: 'MALT131',
          },
        ],
        id: 'MA126',
      },
      {
        label: 'Task Set up',
        link: 'setups/task-setup/index',
        id: 'MTSu132',
      },
      {
        label: 'Tariffs',
        link: 'setups/tariff/index-tariff',
        id: 'MT133',
      },
      {
        label: 'Reinsurance',
        subs: [
          {
            label: 'Treaties',
            link: 'setups/reinsurance/index-treaties',
            id: 'MT135',
          },
          {
            label: 'Profit Sharing',
            link: 'setups/reinsurance/profit-sharing-index',
            id: 'MPS136',
          },
        ],
        id: 'MR134',
      },
    ],
    id: 'MS44',
  },
  {
    label: 'Reports',
    icon: 'evoicon evo-blankdoc',
    subs: [
      {
        label: 'Create/Run',
        link: 'report',
        id: 'MC138',
      },
      {
        label: 'Batch',
        link: 'report/batch',
        id: 'MB139',
      },
    ],
    id: 'MR137',
  },
  {
    label: 'Admin',
    link: 'admin-desk',
    icon: 'evoicon evo-admin',
    subs: [
      {
        label: 'User',
        subs: [
          {
            label: 'User',
            link: 'admin-desk/user/index',
            id: 'MU142',
          },
          {
            label: 'User Group',
            link: 'admin-desk/userGroup',
            id: 'MUG143',
          },
          {
            label: 'User Menu',
            link: 'admin-desk/userMenu',
            id: 'MUM144',
          },
          {
            label: 'Web User',
            subs: [
              {
                label: 'Create New',
                link: 'admin-desk/web-user-create',
                id: 'MCN146',
              },
            ],
            id: 'MWU145',
          },
        ],
        id: 'MU141',
      },
      {
        label: 'Dates',
        subs: [
          {
            label: 'Dates',
            link: 'admin-desk/dates',
            id: 'MD148',
          },
          {
            label: 'Holidays',
            id: 'MH149',
          },
        ],
        id: 'MD147',
      },
      {
        label: 'Authorize',
        icon: 'fas fa-user-lock ',
        subs: [
          {
            label: 'Setups',
            link: 'authorize/setups',
            id: 'MS151',
          },
          {
            label: 'User',
            link: 'authorize/user',
            id: 'MU152',
          },
          {
            label: 'Rates',
            link: 'authorize/rates',
            id: 'MR153',
          },
          {
            label: 'Client-Agent-Policy',
            link: 'authorize/client-agent-policy',
            subs: [
              {
                label: 'Client',
                link: 'authorize/client-agent-policy/client',
                id: 'MC155',
              },
              {
                label: 'Agent',
                link: 'authorize/client-agent-policy/agent',
                id: 'MA156',
              },
              {
                label: 'Policy',
                link: 'authorize/client-agent-policy/policy',
                id: 'MP157',
              },
            ],
            id: 'MC154',
          },
          {
            label: 'WorkFlow',
            link: 'authorize/workflow',
            id: 'MW158',
          },
        ],
        id: 'MA150',
      },
      {
        label: 'Create Batch',
        link: 'admin-desk/createBatch',
        id: 'MCB159',
      },
      {
        label: 'Run Batch',
        link: 'admin-desk/runBatch',
        id: 'MRB160',
      },
      {
        label: 'Batch Log',
        link: 'admin-desk/batchLog',
        id: 'MBL161',
      },
      {
        label: 'Batch Log Files',
        link: 'admin-desk/batchLogFiles',
        id: 'MBLF162',
      },
      {
        label: 'Interest Recalculation',
        link: 'admin-desk/intRecal',
        id: 'MIR163',
      },
      {
        label: 'Configuration',
        link: 'admin-desk/config',
        id: 'MC164',
      },
      {
        label: 'Documents',
        link: 'admin-desk/documents',
        id: 'MD165',
      },
      {
        label: 'Gateway',
        link: 'admin-desk/gateway',
        id: 'MG166',
      },
      {
        label: 'Lottery',
        link: 'admin-desk/lottery',
        id: 'ML167',
      },
      {
        label: 'Evolutics',
        link: 'admin-desk/evolutics',
        id: 'ME168',
      },
    ],
    id: 'MA140',
  },
];
