import { trafficData, revenueData } from '@/lib/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Detailed metrics and performance insights.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Page Views', value: '1.24M', sub: '+18% this month' },
          { label: 'Sessions', value: '348K', sub: '+9% this month' },
          { label: 'Bounce Rate', value: '42.3%', sub: '-2.1% this month' },
          { label: 'Avg. Session', value: '3m 28s', sub: '+0.5% this month' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</p>
            <p className="text-xs text-indigo-500 mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Traffic Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-800">Weekly Traffic</h3>
          <p className="text-xs text-slate-400 mt-0.5">Unique visitors per day</p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={trafficData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 12 }}
              cursor={{ fill: '#f8fafc' }}
            />
            <Bar dataKey="value" name="Visitors" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Line Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-800">Revenue Trend</h3>
          <p className="text-xs text-slate-400 mt-0.5">Year-over-year comparison</p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 12 }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
            />
            <Legend formatter={(value) => <span style={{ fontSize: 11, color: '#64748b' }}>{value}</span>} />
            <Line type="monotone" dataKey="prev" name="Last Year" stroke="#cbd5e1" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="value" name="This Year" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
