import { DbConnectRequest } from "@shared/models/DbConnectRequest";

export class DbGenerateModelRequest {
  connectRequest?: DbConnectRequest;
  filters?: DbGenerateFilter[];
  tables: string[] = [ "all" ];
  additionalParams?: DbGenerateModelAdditionalParams;
}


export interface DbGenerateFilter {
  generateFilterTypes: GenerateFilterTypes;
  value: string;
  beforeValue: string;
  afterValue: string;
}

// export enum GenerateFilterTypes {
//   REPLACE = 'replace', ADD_SUFFIX = 'add_suffix', ADD_PREFIX = 'add_prefix'
// }

export type GenerateFilterTypes = 'replace' | 'add_suffix' | 'add_prefix';

export interface DbGenerateModelAdditionalParams {
  classPackageName: string;
  idtoUUIDFormat: boolean;
}
