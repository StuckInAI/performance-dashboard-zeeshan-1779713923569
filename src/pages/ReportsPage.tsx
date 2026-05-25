import { FileText, Download, Eye, Calendar } from 'lucide-react';
import clsx from 'clsx';

type Report = {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'ready' | 'processing' | 'failed';
};

const reports: Report[] = [
  { id: '1', name: 'Monthly Revenue Report', type: 'PDF', date: '2024-12-01', size: '2.4 MB', status: 'ready' },
  { id: '2', name: 'User Activity Summary', type: 'CSV', date: '2024-12-01', size: '890 KB', status: 'ready' },
  { id: '3', name: 'Q4 Performance Overview', type: 'PDF', date: '2024-11-30', size: '5.1 MB', status: 'ready' },
  { id: '4', name: 'Marketing Funnel Analysis', type: 'XLSX', date: '2024-11-28', size: '1.2 MB', status: 'processing' },
  { id: '5', name: 'Customer Churn Report', type: 'PDF', date: '2024-11-25', size: '3.7 MB', status: 'ready' },
  { id: '6', name: 'Infrastructure Cost Audit', type: 'CSV', date: '2024-11-20', size: '420 KB', status: 'failed' },
];

const statusStyle: Record<string, string> = {
  ready: 'bg-emerald-100 text-emerald-700',
  processing: 'bg-amber-100 text-amber-700',
  failed: 'bg-rose-100 text-rose-700',
};

const typeColor: Record<string, string> = {
  PDF: 'bg-rose-100 text-rose-600',
  CSV: 'bg-emerald-100 text-emerald-600',
  XLSX: 'bg-blue-100 text-blue-600',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Generated reports and exports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors">
          <FileText size={16} />
          Generate Report
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Reports', value: '24', icon: FileText, color: 'text-indigo-600 bg-indigo-100' },
          { label: 'Ready to Download', value: '19', icon: Download, color: 'text-emerald-600 bg-emerald-100' },
          { label: 'This Month', value: '6', icon: Calendar, color: 'text-amber-600 bg-amber-100' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
              <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', item.color)}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{item.value}</p>
                <p className="text-xs text-slate-500">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reports table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider">Report Name</th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Size</th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <FileText size={15} className="text-slate-400 flex-shrink-0" />
                      <span className="font-medium text-slate-700">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={clsx('px-2 py-0.5 rounded text-xs font-medium', typeColor[report.type] || 'bg-slate-100 text-slate-600')}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 hidden sm:table-cell">{report.date}</td>
                  <td className="px-5 py-4 text-slate-500 hidden md:table-cell">{report.size}</td>
                  <td className="px-5 py-4">
                    <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-medium capitalize', statusStyle[report.status])}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-500 transition-colors">
                        <Eye size={15} />
                      </button>
                      <button
                        className={clsx(
                          'p-1.5 rounded-lg transition-colors',
                          report.status === 'ready'
                            ? 'text-slate-400 hover:bg-emerald-50 hover:text-emerald-500'
                            : 'text-slate-200 cursor-not-allowed'
                        )}
                        disabled={report.status !== 'ready'}
                      >
                        <Download size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
