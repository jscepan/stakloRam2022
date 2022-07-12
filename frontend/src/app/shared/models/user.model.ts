import { BaseModel } from './base-model';
import { PermissionModel } from './permission.model';
import { RoleModel } from './role.model';

export class UserModel extends BaseModel {
  displayName: string = '';
  username: string = '';
  enabled: boolean = true;
  fullName: string = '';
  email: string = '';
  language: string = '';
  roles: RoleModel[] = [];
  permissions: PermissionModel[] = [];
}
