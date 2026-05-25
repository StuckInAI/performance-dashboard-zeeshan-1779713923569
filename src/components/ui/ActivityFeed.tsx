import {
  FilePlus,
  Pencil,
  Trash2,
  LogIn,
  Download,
} from 'lucide-react';
import clsx from 'clsx';
import type { RecentActivity } from '@/types';

type ActivityFeedProps = {
  activities: RecentActivity[];
};

const typeConfig: Record<string, { icon: any; color: string }> = {
  create: { icon: FilePlus, color: 'bg-emerald-100 text-emerald-600' },
  update: { icon: Pencil, color: 'bg-blue-100 text-blue-600' },
  delete: { icon: Trash2, color: 'bg-rose-100 text-rose-600' },
  login: { icon: LogIn, color: 'bg-indigo-100 text-indigo-600' },
  export: { icon: Download, color: 'bg-amber-100 text-amber-600' },
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h3 className="text-base font-semibold text-slate-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const config = typeConfig[activity.type] || typeConfig.create;
          const Icon = config.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', config.color)}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium text-indigo-600">{activity.target}</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
