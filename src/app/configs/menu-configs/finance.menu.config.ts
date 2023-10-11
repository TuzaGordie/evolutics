import { IMenuItem, MenuItemDivider } from 'src/app/Shared/models/index.model';
import { appRoutes } from '../app-routes-configs/app-routes.config';
export const financeSubMenu: IMenuItem[] = [
  {
    label: 'Operations',
    icon: 'fas fa-cogs ',
    subs: [
      {
        label: 'Find Policy',
        link: '/finance/policy-desk/find',
        id: 'MFP638',
      },
      {
        label: 'Find Agent',
        link: '/finance/agent-desk/find',
        id: 'MFA639',
      },
      {
        label: 'Find Client',
        link: '/finance/client-desk/find',
        id: 'MFC640',
      },
      {
        label: 'Quotations',
        link: 'quotation',
        id: 'MQ641',
      },
    ],
    id: 'MO637',
  },
  {
    label: 'Payment Desk',
    icon: 'evoicon evo-debitcards',
    subs: [
      {
        label: 'Create Coupon',
        link: '/finance/payment-desk/create-coupon',
        id: 'MCC643',
      },
      {
        label: 'Authorize Coupon',
        link: '/finance/payment-desk/authorize-coupon',
        id: 'MAC644',
      },
      {
        label: 'Find Expense',
        id: 'MFE645M',
      },
      {
        label: 'Find Coupon',
        id: 'MFC646M',
      },
      {
        label: 'Pending Claims',
        link: '/finance/payment-desk/pending-claims',
        id: 'MPC645',
      },
      {
        label: 'Pending Payment Outwards',
        link: '/finance/payment-desk/pending-payment-outwards',
        id: 'MPPO646',
      },
      {
        label: 'Authorize Payment Outwards',
        link: '/finance/payment-desk/authorize-payment-outward',
        id: 'MAPO647',
      },
      {
        label: 'Authorize Inward Suspense Switch',
        link: '/finance/payment-desk/authorize-inward-suspense',
        id: 'MAISS648',
      },
      {
        label: 'Authorize Policy Account',
        link: '/finance/payment-desk/authorize-policy-account',
        id: 'MAPA649',
      },
      {
        label: 'Authorize Commission Adjustments',
        link: '/finance/payment-desk/authorize-commission-adjustments',
        id: 'MACA650',
      },
      {
        label: 'Authorize Claim Adjustments',
        link: '/finance/payment-desk/authorize-claim-adjustments',
        id: 'MACA651',
      },
      {
        label: 'Pending Authorisation Quotes',
        id: 'MPAQ652M',
      },
      {
        label: 'Quote Authorisation',
        id: 'MQA653M',
      },
      {
        label: 'Pending Reinsurance Decisions',
        id: 'MPRD654M',
      },
      {
        label: 'Reinsurance Authorisations',
        id: 'MRA655M',
      },
    ],
    id: 'MPD642',
  },
  {
    label: 'Receipting Desk ',
    icon: 'fas fa-wallet ',
    subs: [
      {
        label: 'Overview',
        link: 'receipting-desk/overview',
        id: 'MO653',
      },
      {
        label: 'Unposted',
        link: 'receipting-desk/unposted',
        id: 'MU654',
      },
      {
        label: 'Create New',
        link: 'receipting-desk/create-new',
        id: 'MCN655',
      },
      {
        label: 'Unreconciled',
        link: 'receipting-desk/unreconciled',
        id: 'MU656',
      },
    ],
    id: 'MRD652',
  },
  {
    label: 'Accounting Desk',
    icon: 'fas fa-landmark ',
    subs: [
      {
        label: 'Bank',
        subs: [
          {
            label: 'Bank Accounts',
            link: 'account/bank/bank-account',
            id: 'MBA659',
          },
          {
            label: 'Bank Accounts Reconciliation',
            link: 'account/bank/bank-account-reconciliation',
            id: 'MBAR660',
          },
          {
            label: 'Cheque Writing',
            link: 'account/bank/cheque-writing',
            id: 'MCW661',
          },
          {
            label: 'Local Bank List',
            link: 'account/bank/bank',
            id: 'MLBL662',
          },
        ],
        id: 'MB658',
      },
      {
        label: 'Accounts',
        subs: [
          {
            label: 'Account Code',
            link: 'setups/accounts/accounts/index-account',
            id: 'MAC664',
          },
          {
            label: 'General Ledger Mapping',
            link: 'setups/accounts/general-ledger-mapping/index-GLM',
            id: 'MGLM665',
          },
          {
            label: 'Payment Outward',
            link: 'setups/accounts/payment-outward',
            id: 'MPO666',
          },
          {
            label: 'Adjustment Account Mapping',
            link: 'setups/accounts/adjustment-account-mapping',
            id: 'MAAM667',
          },
          {
            label: 'Account Ledger',
            link: 'setups/accounts/account-ledger',
            id: 'MAL668',
          },
          {
            label: 'Budget',
            link: 'setups/accounts/budget',
            id: 'MB669',
          },
          {
            label: 'Transaction Reason Mapping',
            link: 'setups/accounts/transaction-reason-mapping',
            id: 'MTRM670',
          },
          {
            label: 'Financial Statement',
            subs: [
              {
                label: 'Account Line',
                link: 'setups/accounts/financial-statement/account-line',
                id: 'MAL672',
              },
              {
                label: 'Account Class',
                link: 'setups/accounts/financial-statement/account-class',
                id: 'MAC673',
              },
              {
                label: 'Financial Statement',
                link: 'setups/accounts/financial-statement/financial-statement',
                id: 'MFS674',
              },
            ],
            id: 'MFS671',
          },
        ],
        id: 'MA663',
      },
      {
        label: 'Create Account Journal',
        link: 'account/create',
        id: 'MCAJ675',
      },
      {
        label: 'Company Assets',
        id: 'MCA675M',
        link: 'account/company-assets',
      },
      {
        label: 'Financial Statement',
        id: 'MFS676M',
        link: 'account/financial-statement',
      },
      {
        label: 'Create Expense Journal',
        link: 'account/create-expense-journal',
        id: 'MCEJ676',
      },
      {
        label: 'Control',
        subs: [
          {
            label: 'Payment Outwards',
            link: 'payment-desk/authorize-payment-outward',
            id: 'MPO678',
          },
          {
            label: 'Policy Accounting',
            link: '/finance/payment-desk/authorize-policy-account',
            id: 'MPA679',
          },
          {
            label: 'Receipt',
            link: 'account/controls/receipt',
            id: 'MR680',
          },
          {
            label: 'Suspense Switch',
            link: 'account/controls/auth-suspense-switch',
            id: 'MSS681',
          },
          {
            label: 'Commission General Adjustment',
            link: 'account/controls/auth-com-adjustment',
            id: 'MCGA682',
          },
        ],
        id: 'MC677',
      },
      {
        label: 'Cost Accounting',
        link: 'cash-report',
        subs: [
          {
            label: 'Chart of Cost Type',
            link: 'account/cost-accounting/cost-type',
            id: 'MCoCT684',
          },
          {
            label: 'Chart of Cost Centers',
            link: 'account/cost-accounting/cost-center',
            id: 'MCoCC685',
          },
          {
            label: 'Chart of Cost Objects',
            link: 'account/cost-accounting/cost-objects',
            id: 'MCoCO686',
          },
          {
            label: 'Cost Allocation',
            link: 'account/cost-accounting/cost-allocation',
            id: 'MCA687',
          },
          {
            label: 'Cost Budgets',
            link: 'account/cost-accounting/cost-budget',
            id: 'MCB688',
          },
          {
            label: 'Cost Journal',
            id: 'MCJ689',
          },
          {
            label: 'Expense Analysis',
            id: 'MEA690',
          },
        ],
        id: 'MCA683',
      },
    ],
    id: 'MAD657',
  },
  {
    label: 'Asset Desk',
    link: 'asset-desk',
    icon: 'fas fa-car ',
    subs: [
      {
        label: 'Overview',
        link: 'asset-desk/overview',
        id: 'MO191M',
      },
      {
        label: 'Find Asset',
        link: 'asset-desk/find',
        id: 'MFA192M',
      },
      {
        label: 'Create new',
        link: 'asset-desk/create',
        id: 'MCn193M',
      },
    ],
    id: 'MAD190M',
  },
  {
    label: 'Workflow Desk',
    icon: 'fas fa-tasks ',
    subs: [
      {
        label: 'Overview',
        link: '/finance/workflow-desk/overview',
        id: 'MO692',
      },
      {
        label: 'Find Workflow Task',
        link: '/finance/workflow-desk/find',
        id: 'MFWT693',
      },
      {
        label: 'Create New',
        link: '/finance/workflow-desk/create',
        subs: [
          {
            label: 'Task',
            link: '/finance/workflow-desk/task',
            id: 'MT695',
          },
          {
            label: 'Schedule',
            link: '/finance/workflow-desk/schedule',
            id: 'MS696',
          },
        ],
        id: 'MCN694',
      },
    ],
    id: 'MW691',
  },
  {
    label: 'Set-ups',
    icon: 'evoicon evo-setting',
    subs: [
      {
        label: 'Allocation Setup',
        link: 'setups/allocation-setup',
        id: 'MAS698',
      },
      {
        label: 'Bank',
        subs: [
          {
            label: 'Bank',
            link: 'setups/accounts/bank/bank',
            id: 'MB700',
          },
          {
            label: 'Sort Code',
            link: 'setups/accounts/bank/sort-code',
            id: 'MSC701',
          },
          {
            label: 'Bank Accounts',
            link: 'setups/accounts/bank/bank-accounts',
            id: 'MBA702',
          },
        ],
        id: 'MB699',
      },
      {
        label: 'IFRS',
        subs: [
          {
            label: 'Contact Grouping',
            subs: [
              {
                label: 'Cohort Groupings',
                id: 'MFCG540M',
              },
              {
                label: 'Onerous Groupings',
                id: 'MFOG541M',
              },
            ],
            id: 'MFCG539M',
          },
          {
            label: 'Approach Mapping',
            id: 'MFAM542M',
          },
          {
            label: 'Coverage Period',
            id: 'MFCP543M',
          },
          {
            label: 'Risk Adjustment',
            id: 'MFRA544M',
          },
          {
            label: 'Discount',
            id: 'MFD545M',
          },
        ],
        id: 'MFI538M',
      },
      {
        label: 'Account Setup',
        id: 'MAS703',
      },
      {
        label: 'Depreciation',
        id: 'MD703M',
        link: 'setups/depreciation',
      },
      {
        label: 'Expense Setup',
        link: 'setups/expense-setup',
        id: 'MES704',
      },
      {
        label: 'Cost Center Setup',
        link: 'setups/cost-center-setup',
        id: 'MCCS705',
      },
      {
        label: 'Task Setup',
        link: 'setups/task-setup/index',
        id: 'MTS706',
      },
      {
        label: 'Codes',
        id: 'MFC707M',
        subs: [
          {
            label: 'List Values',
            link: 'setups/code/index-parameters',
            id: 'MC708M',
          },
        ],
      },
    ],
    id: 'MS697',
  },
  {
    label: 'Reports',
    icon: 'evoicon evo-blankdoc',
    subs: [
      {
        label: 'Create/Run',
        link: 'report',
        id: 'MC708',
      },
      {
        label: 'Batch',
        link: 'report/batch',
        id: 'MB709',
      },
    ],
    id: 'MR707',
  },
  {
    label: 'Admin',
    link: '/finance/admin-desk',
    icon: 'evoicon evo-admin',
    subs: [
      {
        label: 'User',
        link: '/finance/admin-desk/user/index',
        subs: [
          {
            label: 'User',
            link: '/finance/admin-desk/user/index',
            id: 'MU712',
          },
          {
            label: 'User Group',
            link: '/finance/admin-desk/userGroup',
            id: 'MUG713',
          },
          {
            label: 'User Menu',
            link: '/finance/admin-desk/userMenu',
            id: 'MUM714',
          },
        ],
        id: 'MU711',
      },
      {
        label: 'Authorize',
        icon: 'fas fa-user-lock ',
        id: 'MA715',
      },
      {
        label: 'Create Batch',
        link: '/finance/admin-desk/createBatch',
        id: 'MCB716',
      },
      {
        label: 'Run Batch',
        link: '/finance/admin-desk/runBatch',
        id: 'MRB717',
      },
      {
        label: 'Configuration',
        link: 'admin-desk/configuration',
        id: 'MC718',
      },
    ],
    id: 'MA710',
  },
];
