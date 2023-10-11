import { IMenuItem, MenuItemDivider } from 'src/app/Shared/models/index.model';
export const documentSubMenu: IMenuItem[] = [
  {
    label: 'Documents',
    icon: 'evoicon evo-agent',
    subs: [
      {
        label: 'Upload',
        link: 'add',
        id: 'MU721',
      },
      {
        label: 'Bulk Upload',
        link: 'bulk-upload',
        id: 'MBU722',
      },
      {
        label: 'Retrieve',
        link: 'retrieve',
        id: 'MR723',
      },
      {
        label: 'Scan',
        link: 'scan',
        id: 'MS724',
      },
    ],
    id: 'MD720',
  },
  {
    label: 'Workflow Desk',
    icon: 'fas fa-tasks ',
    subs: [
      {
        label: 'Overview',
        id: 'MO726',
      },
      {
        label: 'Find Workflow Task',
        link: 'workflow/find',
        id: 'MFWT727',
      },
      {
        label: 'Create New',
        subs: [
          {
            label: 'Task',
            link: 'workflow/task/create',
            id: 'MT729',
          },
          {
            label: 'Schedule',
            link: 'workflow/schedule/create',
            id: 'MS730',
          },
        ],
        id: 'MCN728',
      },
    ],
    id: 'MWD725',
  },
  {
    label: 'Set-ups',
    icon: 'evoicon evo-setting',
    subs: [
      {
        label: 'Document',
        subs: [
          {
            label: 'Sensitivity',
            link: 'setup/sensitivity',
            id: 'MS733',
          },
          {
            label: 'Box No',
            link: 'setup/product-code',
            id: 'MBN734',
          },
          {
            label: 'Mapping',
            link: 'setup/mapping',
            id: 'MM735',
          },
        ],
        id: 'MD732',
      },
      {
        label: 'Code',
        subs: [
          {
            label: 'Parameters',
            link: '/life/setup/product-cover-code',
            id: 'MP737',
          },
        ],
        id: 'MC736',
      },
      {
        label: 'Organisation',
        subs: [
          {
            label: 'Company',
            link: '/life/setup/product-cover-code',
            id: 'MC739',
          },
          {
            label: 'Branches',
            link: '/life/setup/product-code',
            id: 'MB740',
          },
        ],
        id: 'MO738',
      },
    ],
    id: 'MS731',
  },
  {
    label: 'Admin',
    icon: 'fas fa-user-lock ',
    subs: [
      {
        label: 'User',
        subs: [
          {
            label: 'User',
            link: 'admin/user/index',
            id: 'MU743',
          },
          {
            label: 'User Group',
            link: 'admin/usergroup',
            id: 'MUG744',
          },
          {
            label: 'User Menu',
            link: 'admin/userMenu',
            id: 'MUM745',
          },
        ],
        id: 'MU742',
      },
      {
        label: 'Authorize',
        icon: 'fas fa-user-lock ',
        id: 'MA746',
      },
      {
        label: 'Configuration',
        link: 'admin/configuration',
        id: 'MC747',
      },
    ],
    id: 'MA741',
  },
];
