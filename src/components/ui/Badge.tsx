import clsx from 'clsx';

type BadgeProps = {
  status: 'active' | 'inactive' | 'pending';
};

const statusMap: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-600',
  pending: 'bg-amber-100 text-amber-700',
};

export default function Badge({ status }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        statusMap[status]
      )}
    >
      <span
        className={clsx(
          'w-1.5 h-1.5 rounded-full mr-1.5',
          status === 'active'
            ? 'bg-emerald-500'
            : status === 'pending'
            ? 'bg-amber-500'
            : 'bg-slate-400'
        )}
      />
      {status}
    </span>
  );
}
