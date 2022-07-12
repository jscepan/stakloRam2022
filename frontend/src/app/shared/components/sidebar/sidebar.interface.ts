export interface SidebarNavItemI {
  id: string;
  title: string;
  icon: string;
  isFav?: boolean;
  activated: boolean;
  hidden?: boolean;
  children?: SidebarNavItemI[];
  disabled?: boolean;
}

export interface SidebarI {
  logoUrl: string;
  isExpanded: boolean;
  isCollapsible: boolean;
  navItems: SidebarNavItemI[];
}
