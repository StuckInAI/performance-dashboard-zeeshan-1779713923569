import { useState } from 'react';
import { users as initialUsers } from '@/lib/mockData';
import Badge from '@/components/ui/Badge';
import type { User } from '@/types';
import { Search, UserPlus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

type SortKey = keyof Pick<User, 'name' | 'email' | 'role' | 'status'>;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filtered = users
    .filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || u.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="text-slate-300" />;
    return sortDir === 'asc' ? (
      <ChevronUp size={12} className="text-indigo-500" />
    ) : (
      <ChevronDown size={12} className="text-indigo-500" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Users</h1>
          <p className="text-sm text-slate-500 mt-1">{users.length} total users</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors">
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'inactive', 'pending'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={clsx(
                'px-3 py-2 text-xs font-medium rounded-xl capitalize transition-colors',
                filterStatus === s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider">
                  <button className="flex items-center gap-1" onClick={() => handleSort('name')}>
                    User <SortIcon col="name" />
                  </button>
                </th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider">
                  <button className="flex items-center gap-1" onClick={() => handleSort('role')}>
                    Role <SortIcon col="role" />
                  </button>
                </th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider">
                  <button className="flex items-center gap-1" onClick={() => handleSort('status')}>
                    Status <SortIcon col="status" />
                  </button>
                </th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">
                  Joined
                </th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">
                  Last Seen
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold flex-shrink-0">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{user.role}</td>
                  <td className="px-5 py-4">
                    <Badge status={user.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-500 hidden md:table-cell">{user.joinedDate}</td>
                  <td className="px-5 py-4 text-slate-500 hidden lg:table-cell">{user.lastSeen}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
