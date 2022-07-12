export interface MenuItemI {
  key: string;
  displayName: string;
  hasTopSeparator?: boolean;
  subMenuItems?: MenuItemI[];
  icon?: string;
}
