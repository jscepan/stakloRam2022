import { BaseModel } from './base-model';
import { PermissionModel } from './permission.model';
import { RoleModel } from './role.model';

export class UserModel extends BaseModel {
  username: string = '';
  fullName: string = '';
  email: string = '';
  enabled: boolean = true;
  roles: RoleModel[] = [];
  permissions: PermissionModel[] = [];
  language: string = '';
}
