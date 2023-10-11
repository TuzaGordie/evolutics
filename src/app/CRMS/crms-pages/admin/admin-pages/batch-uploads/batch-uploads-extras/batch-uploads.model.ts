import { ICodeTitle } from 'src/app/Shared/models/index.model';

export enum EBatchUploadType {
  individualClients = 'individual-clients',
  corporateClients = 'corporate-clients',
  branches = 'branches',
  clientBanks = 'client-banks',
  clientRelationships = 'client-relationships',
  clientContacts = 'client-contacts',
  agents = 'agents',
  agentHierachy = 'agent-hierachies',
  leads = 'leads',
  companyDirectors = 'company-directors',
}
export namespace BatchUpload {
  export const batchUploadTypes: ICodeTitle[] = [
    { code: EBatchUploadType.individualClients, title: 'Individual Clients' },
    { code: EBatchUploadType.corporateClients, title: 'Corporate Clients' },
    { code: EBatchUploadType.branches, title: 'Branches' },
    { code: EBatchUploadType.clientBanks, title: 'Client Banks' },
    {
      code: EBatchUploadType.clientRelationships,
      title: 'Client Relationships',
    },
    { code: EBatchUploadType.clientContacts, title: 'Client Contacts' },
    { code: EBatchUploadType.agents, title: 'Agents' },
    { code: EBatchUploadType.agentHierachy, title: 'Agent Hierachies' },
    { code: EBatchUploadType.leads, title: 'Leads' },
    { code: EBatchUploadType.companyDirectors, title: 'Company Directors' },
  ];
  export function getTitle(type: EBatchUploadType) {
    if (!type) return null;
    return batchUploadTypes.find((x) => x.code == type)?.title;
  }
  export function get(type: EBatchUploadType) {
    if (!type) return null;
    return batchUploadTypes.find((x) => x.code == type) 
  }
}
