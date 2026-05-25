import { useState } from 'react';
import { Save, User, Bell, Shield, Palette } from 'lucide-react';
import clsx from 'clsx';

type Section = 'profile' | 'notifications' | 'security' | 'appearance';

const sections: { key: Section; label: string; icon: any }[] = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'appearance', label: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="md:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-2 space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    activeSection === s.key
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <Icon size={16} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            {activeSection === 'profile' && <ProfileSection />}
            {activeSection === 'notifications' && <NotificationsSection />}
            {activeSection === 'security' && <SecuritySection />}
            {activeSection === 'appearance' && <AppearanceSection />}

            <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <Save size={15} />
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
              {saved && (
                <span className="text-sm text-emerald-600 font-medium">Changes saved successfully.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-slate-800">Profile Information</h2>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
          AD
        </div>
        <button className="text-sm text-indigo-600 font-medium hover:underline">Change Photo</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name" defaultValue="Admin" />
        <Field label="Last Name" defaultValue="User" />
        <Field label="Email" defaultValue="admin@dashify.io" type="email" />
        <Field label="Phone" defaultValue="+1 555-000-1234" type="tel" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
        <textarea
          rows={3}
          defaultValue="Dashboard administrator with full access."
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 resize-none"
        />
      </div>
    </div>
  );
}

function NotificationsSection() {
  const items = [
    { label: 'Email Notifications', desc: 'Receive updates via email', defaultChecked: true },
    { label: 'Push Notifications', desc: 'Receive push alerts in-browser', defaultChecked: false },
    { label: 'Weekly Digest', desc: 'Summary email every Monday', defaultChecked: true },
    { label: 'Security Alerts', desc: 'Notify on login from new device', defaultChecked: true },
  ];
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-slate-800">Notification Preferences</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <Toggle key={item.label} label={item.label} desc={item.desc} defaultChecked={item.defaultChecked} />
        ))}
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-slate-800">Security Settings</h2>
      <div className="space-y-4">
        <Field label="Current Password" type="password" defaultValue="" />
        <Field label="New Password" type="password" defaultValue="" />
        <Field label="Confirm New Password" type="password" defaultValue="" />
      </div>
      <Toggle label="Two-Factor Authentication" desc="Add an extra layer of security" defaultChecked={false} />
    </div>
  );
}

function AppearanceSection() {
  const themes = ['Light', 'Dark', 'System'];
  const [selected, setSelected] = useState('Light');
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-slate-800">Appearance</h2>
      <div>
        <p className="text-sm font-medium text-slate-700 mb-3">Theme</p>
        <div className="flex gap-3">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setSelected(t)}
              className={clsx(
                'px-4 py-2 text-sm rounded-xl border font-medium transition-colors',
                selected === t
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700 mb-3">Accent Color</p>
        <div className="flex gap-2">
          {['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
            <button
              key={color}
              className="w-7 h-7 rounded-full border-2 border-white ring-2 ring-slate-200 hover:ring-slate-400 transition-all"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  defaultValue: string;
  type?: string;
};

function Field({ label, defaultValue, type = 'text' }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
      />
    </div>
  );
}

type ToggleProps = {
  label: string;
  desc: string;
  defaultChecked: boolean;
};

function Toggle({ label, desc, defaultChecked }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={clsx(
          'relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0',
          checked ? 'bg-indigo-600' : 'bg-slate-200'
        )}
        style={{ height: '22px', width: '40px' }}
      >
        <span
          className={clsx(
            'absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform',
            checked ? 'translate-x-[18px]' : 'translate-x-0'
          )}
          style={{ width: '18px', height: '18px' }}
        />
      </button>
    </div>
  );
}
