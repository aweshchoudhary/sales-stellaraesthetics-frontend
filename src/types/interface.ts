export interface LoginCredentialTypes {
  user: string;
  password: string;
}

export interface SelectInterface {
  label: string;
  value: string;
}

export interface BaseModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PipelineInterface extends BaseModel {
  name: string;
  stages: string[];
  deals: string[];
  owner: string;
  assignees: string[];
}
export interface UserInterface extends BaseModel {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface StageInterface extends BaseModel {
  name: string;
  desc: string;
  deals: string[];
  pipelineId: string;
  position: number;
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
  creator: UserInterface;
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
  performer: UserInterface;
  creator: UserInterface;
  deals: DealInterface[];
  contacts: ContactInterface[];
  involved_contacts: ContactInterface[];
  involved_users: UserInterface[];
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
  creator: UserInterface;
}

export interface FileInterface extends BaseModel {
  name: string;
  size: string;
  type: string;
  url: string;
  file?: File;
  dealId: DealInterface[];
  contactId: ContactInterface[];
  sent_to_users: UserInterface[];
  sent_to_contacts: ContactInterface[];
  uploader: UserInterface;
}

export interface GetArgInterface {
  id: string;
  params?: {
    select?: string;
    populate?: string;
  };
}
