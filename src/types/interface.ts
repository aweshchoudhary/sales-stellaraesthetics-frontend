import { User } from "firebase/auth";

export interface LoginCredentialTypes {
  email: string;
  password: string;
}

export interface SelectInterface {
  label: string;
  value: string;
}

export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiReq {
  id?: string;
  filters: ApiFilters;
}

export interface ApiFilters {
  filters?: any;
  sort?: any;
  limit?: number;
  populate?: any;
  select?: any;
  start?: number;
}

export interface PipelineInterface extends BaseModel {
  name: string;
  desc?: string;
  stages?: string[];
  assignees: string[];
  deals?: string[];
  owner: string;
}

export interface StageInterface extends BaseModel {
  name: string;
  desc?: string;
  position: number;
  pipelineId: string;
  deals: string[];
}

export interface DealInterface extends BaseModel {
  title: string;
  desc: string;
  value: number;
  currency: string;
  currentStage: string;
  label: LabelInterface;
  expectedClosingDate: Date;
  status: string;
  pipelineId: string;
  contacts: ContactInterface[];
  items: string;
  notes: NoteInterface[];
  activities: ActivityInterface[];
  files: FileInterface[];
  mails: string;
  creator: User;
}
export interface LabelInterface extends BaseModel {
  name: string;
  color: string;
}

export interface CompanyInterface extends BaseModel {
  name: string;
  description: string;
  mobile: string;
  whatsapp: string;
  email: string;
}

export interface ContactInterface extends BaseModel {
  company: string;
  contactPerson: string;
  mobile: string;
  whatsapp: string;
  email: string;
}

export interface ActivityInterface extends BaseModel {
  title: string;
  description?: string;
  type: string;
  startDateTime: Date;
  endDateTime: Date;
  location?: string;
  taskUrl?: string;
  performer: string;
  creator: string;
  deals: DealInterface[];
  contacts: ContactInterface[];
  involved_contacts: ContactInterface[];
  involved_users: string[];
  icon: string;
  completed_on: Date | null;
  googleEventId?: string;
  googleEventHtmlLink?: string;
}

export interface NoteInterface extends BaseModel {
  pipelineId: string;
  noteBody: string;
  deals: DealInterface[];
  contacts: ContactInterface[];
  creator: User;
}

export interface FileInterface extends BaseModel {
  name: string;
  size: string;
  type: string;
  url: string;
  file?: File;
  dealId: DealInterface[];
  contactId: ContactInterface[];
  sent_to_users: User[];
  sent_to_contacts: ContactInterface[];
  uploader: User;
}

export interface GetArgInterface {
  id: string;
  params?: {
    select?: string;
    populate?: string;
  };
}
