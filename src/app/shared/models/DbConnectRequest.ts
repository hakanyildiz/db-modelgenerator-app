import { DbType } from "@shared/models/DbType";

export class DbConnectRequest {
  ip?: string;
  port?: number;
  username?: string;
  password?: string;
  owner?: string;
  dbType?: DbType;
  schema?: string;
}
