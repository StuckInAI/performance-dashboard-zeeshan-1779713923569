export type StatCard = {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  joinedDate: string;
  lastSeen: string;
};

export type RecentActivity = {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'create' | 'update' | 'delete' | 'login' | 'export';
};

export type ChartDataPoint = {
  name: string;
  value: number;
  prev?: number;
};

export type NavItem = {
  label: string;
  path: string;
  icon: string;
};
