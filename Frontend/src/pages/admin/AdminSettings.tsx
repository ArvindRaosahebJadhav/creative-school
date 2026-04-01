import React, { useState, useEffect } from 'react';
import { Save, Settings } from 'lucide-react';
import { logger } from '../../lib/logger';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminSettings() {
  const [info, setInfo] = useState<any>({
    school_name: 'Little Stars Primary School',
    address: '123 Education Lane, Knowledge City, State 560001',
    phone: '+91 98765 43210',
    email: 'info@littlestars.edu.in',
    principal_name: 'Mrs. Anjali Sharma',
    admissions_status: 'Open',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/school-info`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) setInfo(data);
      })
      .catch((err) => logger.error('Error loading school info:', err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_URL}/school-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(info),
    });
    if (res.ok) {
      setMessage('Settings saved successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-school-blue/10 text-school-blue flex items-center justify-center">
            <Settings size={24} />
          </div>
          <h3 className="text-2xl font-display text-school-blue">School Information</h3>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">School Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={info.school_name}
                onChange={(e) => setInfo({ ...info, school_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Principal Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={info.principal_name}
                onChange={(e) => setInfo({ ...info, principal_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Phone Number</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">School Address</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Admissions Status</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={info.admissions_status}
                onChange={(e) => setInfo({ ...info, admissions_status: e.target.value })}
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
          </div>

          {message && <p className="text-secondary font-bold text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-4 w-full md:w-auto px-12 flex items-center justify-center gap-2"
          >
            {loading ? (
              'Saving...'
            ) : (
              <>
                Save Changes <Save size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
