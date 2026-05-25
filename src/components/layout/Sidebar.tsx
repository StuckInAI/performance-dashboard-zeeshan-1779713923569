import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Settings,
  X,
  Zap,
} from 'lucide-react';
import clsx from 'clsx';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const navItems = [
  { label: 'Overview', path: '/overview', icon: LayoutDashboard },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Users', path: '/users', icon: Users },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          'fixed md:static z-30 h-full flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out overflow-hidden',
          open ? 'w-64' : 'w-0 md:w-16'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-200 min-w-[256px]">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-slate-800 text-lg whitespace-nowrap">
            Dashify
          </span>
          <button
            onClick={onClose}
            className="ml-auto text-slate-400 hover:text-slate-600 md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 min-w-[256px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  )
                }
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-200 min-w-[256px]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@dashify.io</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
