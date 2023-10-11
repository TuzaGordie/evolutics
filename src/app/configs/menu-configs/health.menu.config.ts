import { IMenuItem, MenuItemDivider } from 'src/app/Shared/models/index.model';
export const healthSubMenu: IMenuItem[] = [
  {
    label: 'Agent Desk',
    icon: 'evoicon evo-agent',
    subs: [
      {
        label: 'Overview',
        link: 'agent-desk/overview',
        id: 'MO343',
      },
      {
        label: 'Find Agent',
        link: 'agent-desk/find-main-agent',
        id: 'MFA344',
      },
      {
        label: 'Create New Agent',
        link: 'agent-desk/create-index',
        id: 'MCNA345',
      },
    ],
    id: 'MAD342',
  },
  {
    label: 'Client Desk',
    icon: 'evoicon evo-profile',
    subs: [
      {
        label: 'Overview',
        link: 'client-desk/overview',
        id: 'MO347',
      },
      {
        label: 'Find Client',
        link: 'client-desk/find',
        id: 'MFC348',
      },
      {
        label: 'Create New Client',
        subs: [
          {
            label: 'Individual',
            link: 'client-desk/create/individual',
            id: 'MI350',
          },
          {
            label: 'Corporate',
            link: 'client-desk/create/corporate',
            id: 'MC351',
          },
          {
            label: 'Provider',
            link: 'client-desk/create/provider/index',
            id: 'MP352',
          },
        ],
        id: 'MCNC349',
      },
    ],
    id: 'MCD346',
  },
  {
    label: 'Quotation Desk',
    icon: 'evoicon evo-multidoc',
    subs: [
      {
        label: 'Overview',
        link: 'quotation-desk/overview',
        id: 'MO354',
      },
      {
        label: 'Find Quote',
        link: 'quotation-desk/find',
        id: 'MFQ355',
      },
      {
        label: 'Create New Quotation',
        subs: [
          {
            label: 'Individual',
            link: 'quotation-desk/create/individual',
            id: 'MI357',
          },
          {
            label: 'Group',
            link: 'quotation-desk/create-group-quotation',
            id: 'MG358',
          },
        ],
        id: 'MCNQ356',
      },
    ],
    id: 'MQD353',
  },
  {
    label: 'Policy Desk',
    icon: 'evoicon evo-find',
    subs: [
      {
        label: 'Overview',
        link: 'policy-desk/overview',
        id: 'MO360',
      },
      {
        label: 'Find Policy',
        link: 'policy-desk/find',
        id: 'MFP361',
      },
    ],
    id: 'MPD359',
  },
  {
    label: 'Group Desk',
    icon: 'evoicon evo-menu',
    subs: [
      {
        label: 'Overview',
        link: 'group-desk/overview',
        id: 'MO363',
      },
      {
        label: 'Find Group',
        link: 'group-desk/find',
        id: 'MFG364',
      },
    ],
    id: 'MGD362',
  },
  {
    label: 'Workflows',
    subs: [
      {
        label: 'Overview',
        link: 'workflow-desk/overview',
        id: 'MO366',
      },
      {
        label: 'Find Workflow task',
        link: 'workflow-desk/find',
        id: 'MFWt367',
      },
      {
        label: 'Create New',
        subs: [
          {
            label: 'Task',
            link: 'workflow-desk/task',
            id: 'MT369',
          },
          {
            label: 'Schedule',
            link: 'workflow-desk/schedule',
            id: 'MS370',
          },
        ],
        id: 'MCN368',
      },
    ],
    id: 'MW365',
  },
  {
    label: 'Payments',
    icon: 'evoicon evo-debitcards',
    subs: [
      {
        label: 'Create Coupon',
        link: 'payment-desk/create-coupon',
        id: 'MCC372',
      },
      {
        label: 'Authorize Coupon',
        link: 'payment-desk/authorize-coupon',
        id: 'MAC373',
      },
      {
        label: 'Find Expense',
        id: 'MFE378M',
      },
      {
        label: 'Find Coupon',
        id: 'MFC379M',
      },
      {
        label: 'Pending Claims',
        link: 'payment-desk/pending-claims',
        id: 'MPC380M',
      },
      {
        label: 'Pending Payment Outwards',
        link: 'payment-desk/pending-payment-outwards',
        id: 'MPPO374',
      },
      {
        label: 'Authorize Payment Outwards',
        link: 'payment-desk/authorize-payment-outward',
        id: 'MAPO375',
      },
      {
        label: 'Authorize Inward Suspense Switch',
        link: 'payment-desk/authorize-inward-suspense',
        id: 'MAISS376',
      },
      {
        label: 'Authorize Policy Account',
        link: 'payment-desk/authorize-policy-account',
        id: 'MAPA377',
      },
      {
        label: 'Authorize Commission Adjustments',
        link: 'payment-desk/authorize-commission-adjustments',
        id: 'MACA378',
      },
      {
        label: 'Authorize Claim Adjustments',
        link: 'payment-desk/authorize-claim-adjustments',
        id: 'MACA379M',
      },
      {
        label: 'Pending Authorisation Quotes',
        id: 'MPAQ380M',
      },
      {
        label: 'Quote Authorisation',
        id: 'MQA381M',
      },
      {
        label: 'Pending Reinsurance Decisions',
        id: 'MPRD382M',
      },
      {
        label: 'Reinsurance Authorisations',
        id: 'MRA383M',
      },
    ],
    id: 'MP371',
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
            id: 'MHAC46',
          },
          {
            label: 'General Ledger Mapping',
            link: 'setups/accounts/general-ledger-mapping/index-GLM',
            id: 'MHGLM47',
          },
          {
            label: 'Bank',
            subs: [
              {
                label: 'Local Bank List',
                link: 'setups/accounts/bank/bank',
                id: 'MHLBL49',
              },
              {
                label: 'Sort Code',
                link: 'setups/accounts/bank/sort-code',
                id: 'MHSC50',
              },
              {
                label: 'Bank Accounts',
                link: 'setups/accounts/bank/bank-accounts',
                id: 'MHBA51',
              },
            ],
            id: 'MHB48',
          },
          {
            label: 'Payment Outward',
            link: 'setups/accounts/payment-outward',
            id: 'MHPO52',
          },
          {
            label: 'Adjustment Account Mapping',
            link: 'setups/accounts/adjustment-account-mapping',
            id: 'MHAAM53',
          },
          {
            label: 'Account Ledger',
            link: 'setups/accounts/account-ledger',
            id: 'MHAL54',
          },
          {
            label: 'Budget',
            link: 'setups/accounts/budget',
            id: 'MHB55',
          },
          {
            label: 'Transaction Reason Mapping',
            link: 'setups/accounts/transaction-reason-mapping',
            id: 'MHTRM56',
          },
          {
            label: 'Financial Statement     ',
            subs: [
              {
                label: 'Account Line',
                link: 'setups/accounts/financial-statement/account-line',
                id: 'MHAL58',
              },
              {
                label: 'Account Class',
                link: 'setups/accounts/financial-statement/account-class',
                id: 'MHAC59',
              },
              {
                label: 'Financial Statement',
                link: 'setups/accounts/financial-statement/financial-statement',
                id: 'MHFS60',
              },
            ],
            id: 'MHFS57',
          },
        ],
        id: 'MHA45',
      },
      {
        label: 'Process Design',
        subs: [
          {
            label: 'Process SetUp',
            link: 'setups/process-design/index-process-setup',
            id: 'MHPS62',
          },
          {
            label: 'Process Actions',
            link: 'setups/process-design/index-process-actions',
            id: 'MHPA64',
          },
          {
            label: 'Control',
            link: 'setups/process-design/index-control',
            id: 'MHC63',
          },
          {
            label: 'Status',
            subs: [
              {
                label: 'Claim',
                link: 'setups/process-design/status/claim-index',
                id: 'MHC66',
              },
              {
                label: 'Policy',
                link: 'setups/process-design/status/policy-index',
                id: 'MHP67',
              },
              {
                label: 'Payment',
                link: 'setups/process-design/status/payment-index',
                id: 'MHP68',
              },
            ],
            id: 'MHS65',
          },
          {
            label: 'Process SLA',
            link: 'setups/process-design/process-SLA',
            id: 'MHPS69',
          },
          {
            label: 'Clients',
            subs: [
              {
                label: 'Unique Check',
                id: 'MHUC71',
              },
              {
                label: 'Mandatory Data',
                id: 'MHMD72',
              },
            ],
            id: 'MHC70',
          },
          {
            label: 'Requirements',
            subs: [
              {
                label: 'Claims',
                link: 'setups/process-design/requirement/claim',
                id: 'MHC74',
              },
              {
                label: 'New Business',
                link: 'setups/process-design/requirement/new-business',
                id: 'MHNB75',
              },
            ],
            id: 'MHR73',
          },
          {
            label: 'Underwriting',
            subs: [
              {
                label: 'Requirements',
                link: 'setups/process-design/underwriting/Requirements-index',
                id: 'MHR77',
              },
              {
                label: 'Table',
                link: 'setups/process-design/underwriting/Table-index',
                id: 'MHT78',
              },
              {
                label: 'Questions',
                link: 'setups/process-design/underwriting/Questions-index',
                id: 'MHQ79',
              },
              {
                label: 'Loadings',
                link: 'setups/process-design/underwriting/loadings-index',
                id: 'MHL80M',
              },
            ],
            id: 'MHU76',
          },
        ],
        id: 'MHPD61',
      },
      {
        label: 'Products',
        subs: [
          {
            label: 'Cover Code',
            link: 'setups/product/product-cover-code',
            id: 'MHCC81',
          },
          {
            label: 'Product Code',
            link: 'setups/product/product-code',
            id: 'MHPC82',
          },
        ],
        id: 'MHP80',
      },
      {
        label: 'Rates',
        subs: [
          {
            label: 'General Rates',
            link: 'setups/rates/general-rates',
            id: 'MHGR84',
          },
          {
            label: 'Interest Rates',
            link: '/life/setups/rates/interest',
            id: 'MHIR85',
          },
          {
            label: 'Bonus Rates',
            link: 'setups/rates/bonus-rates',
            id: 'MHBR86',
          },
          {
            label: 'Discount Rates',
            link: 'setups/rates/discount-rates',
            id: 'MHDR87',
          },
          {
            label: 'Tax Rates',
            link: 'setups/rates/tax-rates',
            id: 'MHTR88',
          },
          {
            label: 'Short Term Rates',
            link: 'setups/rates/short-term-rates',
            id: 'MHSTR89',
          },
        ],
        id: 'MHR83',
      },
      {
        label: 'Correspondence',
        subs: [
          {
            label: 'Quotation',
            link: 'setups/correspondence/index-quotation',
            id: 'MHQ91',
          },
          {
            label: 'Email',
            link: 'setups/correspondence/index-email',
            id: 'MHE92',
          },
          {
            label: 'Print',
            link: 'setups/correspondence/index-print',
            id: 'MHP93',
          },
          {
            label: 'SMS',
            link: 'setups/correspondence/index-sms',
            id: 'MHS94M',
          },
          {
            label: 'Feed',
            link: 'setups/correspondence/feed',
            id: 'MHF95M',
          },
          {
            label: 'Webhook',
            link: 'setups/correspondence/index-webhook',
            id: 'MHW95',
          },
          {
            label: 'Template',
            link: 'setups/correspondence/index-template',
            id: 'MHT96',
          },
        ],
        id: 'MHC90',
      },
      {
        label: 'Code',
        subs: [
          {
            label: 'Parameters',
            link: 'setups/code/index-parameters',
            id: 'MHP98',
          },
          {
            label: 'Premium Frequencies',
            link: 'setups/code/index-premfreq',
            id: 'MHPF99',
          },
          {
            label: 'Premium Payment Method',
            link: 'setups/code/index-prempaymthd',
            id: 'MHPPM100',
          },
          {
            label: 'Numbering',
            link: 'setups/code/index-numbering',
            id: 'MHN101',
          },
          {
            label: 'Currency',
            subs: [
              {
                label: 'Code',
                link: 'setups/code/currency/code/index',
                id: 'MHC103',
              },
              {
                label: 'Rate',
                link: 'setups/code/currency/rate/index',
                id: 'MHR104',
              },
            ],
            id: 'MHC102',
          },
          {
            label: 'Lottery',
            link: 'setups/code/lottery',
            id: 'MHL105',
          },
          {
            label: 'File Format',
            link: 'setups/code/file-format',
            id: 'MHFF106M',
          },
        ],
        id: 'MHC97',
      },
      {
        label: 'Translations',
        subs: [
          {
            label: 'Menu',
            link: 'setups/translations/index-menu',
            id: 'MHM107',
          },
          {
            label: 'Template',
            link: 'setups/translations/index-template',
            id: 'MHT108',
          },
          {
            label: 'Auto Translator',
            id: 'MHAT109',
          },
          {
            label: 'System Message',
            link: 'setups/translations/index-system-message',
            id: 'MHSM110',
          },
        ],
        id: 'MHT106',
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
                id: 'MHI113',
              },
              {
                label: 'Team',
                link: 'setups/organization/index-team-appraisal',
                id: 'MHT114',
              },
              {
                label: 'Sub Division',
                link: 'setups/organization/index-subdivision-appraisal',
                id: 'MHSD115',
              },
              {
                label: 'Division',
                link: 'setups/organization/index-division-appraisal',
                id: 'MHD116',
              },
              {
                label: 'Company',
                link: 'setups/organization/index-company-appraisal',
                id: 'MHC117',
              },
              {
                label: 'Criteria',
                link: 'setups/organization/index-criteria-appraisal',
                id: 'MHC118',
              },
            ],
            id: 'MHA112',
          },
          {
            label: 'Branches',
            link: 'setups/organization/index-branches',
            id: 'MHB119',
          },
          {
            label: 'Companies',
            link: 'setups/organization/index-company-org',
            id: 'MHC120',
          },
        ],
        id: 'MHO111',
      },
      {
        label: 'Address',
        subs: [
          {
            label: 'Country',
            link: 'setups/address/index-country',
            id: 'MHC122',
          },
          {
            label: 'Region',
            link: 'setups/address/index-region',
            id: 'MHR123',
          },
          {
            label: 'State',
            link: 'setups/address/index-state',
            id: 'MHS124',
          },
          {
            label: 'Town',
            link: 'setups/address/index-town',
            id: 'MHT125',
          },
        ],
        id: 'MHA121',
      },
      {
        label: 'Agents',
        subs: [
          {
            label: 'Agent Type',
            link: 'setups/agents/index-agent-type',
            id: 'MHAT127',
          },
          {
            label: 'Band',
            link: 'setups/agents/index-agent-band',
            id: 'MHB128',
          },
          {
            label: 'Product Grouping',
            link: 'setups/agents/index-product-grouping',
            id: 'MHPG129',
          },
          {
            label: 'Commission Code',
            link: 'setups/agents/index-commission-code',
            id: 'MHCC130',
          },
          {
            label: 'Agent Loan Type',
            link: 'setups/agents/index-agent-loan',
            id: 'MHALT131',
          },
        ],
        id: 'MHA126',
      },
      {
        label: 'Task Set up',
        link: 'setups/task-setup/index',
        id: 'MHTSu132',
      },
      {
        label: 'Tariffs',
        link: 'setups/tariff/index-tariff',
        id: 'MHT133',
      },
      {
        label: 'Reinsurance',
        subs: [
          {
            label: 'Treaties',
            link: 'setups/reinsurance/index-treaties',
            id: 'MHT135',
          },
          {
            label: 'Profit Sharing',
            link: 'setups/reinsurance/profit-sharing-index',
            id: 'MHPS136',
          },
        ],
        id: 'MHR134',
      },
    ],
    id: 'MS379',
  },
  {
    label: 'Reports',
    icon: 'evoicon evo-blankdoc',
    subs: [
      {
        label: 'Create/Run',
        link: 'report-desk',
        id: 'MC459',
      },
      {
        label: 'Batch',
        link: 'report-desk/batch',
        id: 'MB460',
      },
    ],
    id: 'MR458',
  },
  {
    label: 'Admin',
    icon: 'evoicon evo-admin',
    subs: [
      {
        label: 'User',
        subs: [
          {
            label: 'User',
            link: 'admin-desk/user/index',
            id: 'MU463',
          },
          {
            label: 'User Group',
            link: 'admin-desk/usergroup',
            id: 'MUG464',
          },
          {
            label: 'User Menu',
            link: 'admin-desk/userMenu',
            id: 'MUM465',
          },
        ],
        id: 'MU462',
      },
      {
        label: 'Dates',
        subs: [
          {
            label: 'Dates',
            link: 'admin-desk/dates',
            id: 'MD467',
          },
          {
            label: 'Holidays',
            id: 'MH468',
          },
        ],
        id: 'MD466',
      },
      {
        label: 'Authorize',
        id: 'MA469',
      },
      {
        label: 'Create Batch',
        link: 'admin-desk/createbatch',
        id: 'MCB470',
      },
      {
        label: 'Run Batch',
        link: 'admin-desk/runbatch',
        id: 'MRB471',
      },
      {
        label: 'Batch Log',
        link: 'admin-desk/batchlog',
        id: 'MBL472',
      },
      {
        label: 'Interest Recalculation',
        link: 'admin-desk/interestcalculation',
        id: 'MIR473',
      },
      {
        label: 'Database Definition',
        link: 'admin-desk/databasedefinition',
        id: 'MDD474',
      },
      {
        label: 'Configuration',
        link: 'admin-desk/configuration',
        id: 'MC475',
      },
    ],
    id: 'MA461',
  },
];
