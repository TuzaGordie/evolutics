import { IMenuItem, MenuItemDivider } from 'src/app/Shared/models/index.model';
export const crmsSubMenu: IMenuItem[] = [
  {
    label: 'Client Desk',
    icon: 'evoicon evo-profile',
    subs: [
      {
        label: 'Overview',
        link: 'client-crms-overview',
        id: 'MO568',
      },
      {
        label: 'Find Client',
        link: 'find-client',
        id: 'MFC569',
      },
      {
        label: 'Create New Cient',
        link: 'view-client',
        subs: [
          {
            label: 'Individual',
            link: 'individual',
            id: 'MI571',
          },
          {
            label: 'Corporate',
            link: 'corporate',
            id: 'MC572',
          },
          {
            label: 'Provider',
            link: 'index-client-provider',
            id: 'MP573',
          },
        ],
        id: 'MCNC570',
      },
    ],
    id: 'MCD567',
  },
  {
    label: 'Agent Desk',
    icon: 'evoicon evo-agent',
    subs: [
      {
        label: 'Overview',
        id: 'MO575',
      },
      {
        label: 'Find Agent',
        link: 'agent-desk',
        id: 'MFA576',
      },
      {
        label: 'Create New Agent',
        link: 'agent-desk/create-index',
        id: 'MCNA577',
      },
    ],
    id: 'MAD574',
  },
  {
    label: 'Analytics',
    icon: 'evoicon evo-linegraph',
    subs: [
      {
        label: 'Write Report',
        link: 'write-report',
        id: 'MWR579',
      },
      {
        label: 'Pipeline Analysis',
        link: 'pipeline-analysis',
        id: 'MPA580',
      },
      {
        label: 'Customer Explorer',
        link: 'customer-explorer',
        id: 'MCE581',
      },
      {
        label: 'Sales Activities',
        link: 'sales-activities',
        id: 'MSA582',
      },
    ],
    id: 'MA578',
  },
  {
    label: 'Communication',
    icon: 'far fa-comments pe-2',
    subs: [
      {
        label: 'Calendar',
        link: 'analytics-campaign-index',
        id: 'MC584',
      },
      {
        label: 'Find Campaign',
        link: 'find-campaign',
        id: 'MFC585',
      },
      {
        label: 'Create New Campaign',
        link: 'campaign-create',
        id: 'MCNC586',
      },
    ],
    id: 'MC583',
  },
  {
    label: 'Set-ups',
    icon: 'evoicon evo-setting',
    subs: [
      {
        label: 'Client Segments',
        subs: [
          {
            label: 'Segments',
            link: 'overview',
            id: 'MS589',
          },
          {
            label: 'CLV',
            link: 'clv',
            id: 'MC590',
          },
          {
            label: 'Lifecycle Stage',
            link: 'lifecycle',
            id: 'MLS591',
          },
          {
            label: 'Bands',
            link: 'bands',
            id: 'MB592',
          },
          {
            label: 'Groups',
            link: 'client-group',
            id: 'MG593',
          },
        ],
        id: 'MCS588',
      },
      {
        label: 'Codes',
        subs: [
          {
            label: 'Parameters',
            link: 'parameters',
            id: 'MP595',
          },
          {
            label: 'Lead Classification',
            link: 'setup/codes/lead-classification-index',
            id: 'MLC596',
          },
          {
            label: 'Marketing Event',
            link: 'setup/codes/marketing-events-index',
            id: 'MME597',
          },
          {
            label: 'Client Stage',
            link: 'setup/codes/client-stage-index',
            id: 'MCS598',
          },
          {
            label: 'Age Group',
            link: 'setup/codes/age-group',
            id: 'MAG599',
          },
          {
            label: 'Teams',
            link: 'setup/codes/teams-index',
            id: 'MT600',
          },
          {
            label: 'Client Data Score',
            link: 'setup/codes/client-data-score-index',
            id: 'MCDS601',
          },
        ],
        id: 'MC594',
      },
      {
        label: 'Correspondence',
        subs: [
          {
            label: 'Quotation',
            link: 'setup/correspondence/index-quotation',
            id: 'MQ603',
          },
          {
            label: 'Email',
            link: 'setup/correspondence/index-email',
            id: 'ME604',
          },
          {
            label: 'Print',
            link: 'setup/correspondence/index-email',
            id: 'MP605',
          },
          {
            label: 'SMS',
            link: 'setup/correspondence/index-sms',
            id: 'MS606',
          },
          {
            label: 'Feed',
            link: 'setup/correspondence/feed',
            id: 'MF607M',
          },
          {
            label: 'Webhook',
            link: 'setup/correspondence/index-webhook',
            id: 'MW607',
          },
          {
            label: 'Template',
            link: 'setup/correspondence/index-template',
            id: 'MT608',
          },
        ],
        id: 'MC602',
      },
      {
        label: 'Task Setup',
        id: 'MTS609',
      },
      {
        label: 'Resources',
        id: 'MTS610M',
        subs: [
          {
            label: 'Test',
            link: 'setup/resources/test/index',
            id: 'MTS611M',
          },
          {
            label: 'Training',
            link: 'setup/resources/training/index',
            id: 'MTS612M',
          },
        ],
      },
    ],
    id: 'MS587',
  },
  {
    label: 'Sales',
    icon: 'fas fa-money-check ',
    subs: [
      {
        label: 'Create Lead',
        link: 'sales/lead/index',
        id: 'MCL611',
      },
      {
        label: 'Find Lead',
        link: 'sales/find-lead',
        id: 'MFL612',
      },
      {
        label: 'Calendar',
        link: 'analytics-campaign-index',
        id: 'MC613',
      },
      {
        label: 'Quotation',
        link: 'sales/quotations',
        id: 'MQ614',
      },
      {
        label: 'Resources',
        id: 'MQS610M',
        subs: [
          {
            label: 'Test',
            link: 'sales/resources/test/index',
            id: 'MQS611M',
          },
          {
            label: 'Training',
            link: 'sales/resources/training/index',
            id: 'MQS612M',
          },
        ],
      },
    ],
    id: 'MS610',
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
            id: 'MU617',
          },
          {
            label: 'User Group',
            link: 'admin-desk/userGroup',
            id: 'MUG618',
          },
          {
            label: 'User Menu',
            link: 'admin-desk/userMenu',
            id: 'MUM619',
          },
        ],
        id: 'MU616',
      },
      {
        label: 'Authorize',
        icon: 'fas fa-user-lock ',
        subs: [
          {
            label: 'Requisition',
            id: 'MR621',
          },
          {
            label: 'Set-Ups',
            id: 'MS622',
          },
        ],
        id: 'MA620',
      },
      {
        label: 'Configuration',
        link: 'admin-desk/config',
        id: 'MC623',
      },
      {
        label: 'Batch Uploads',
        link: 'admin-desk/batch-uploads',
        id: 'MC624M',
      },
      {
        label: 'Requisition',
        id: 'MR624',
      },
    ],
    id: 'MA615',
  },
];
