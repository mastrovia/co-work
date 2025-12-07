'use client';

import { useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

interface DashboardStats {
  overview: {
    totalSpaces: number;
    activeSpaces: number;
    pendingSpaces: number;
    inactiveSpaces: number;
    totalLeads: number;
    newLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    totalLocations: number;
    conversionRate: string;
  };
  charts: {
    spacesByType: { name: string; value: number }[];
    spacesByCity: { name: string; value: number }[];
    leadsByStatus: { name: string; value: number }[];
  };
  recentLeads: {
    id: string;
    leadId: string;
    name: string;
    email: string;
    enquiredFor: string;
    spaceType: string;
    status: string;
    createdAt: string;
  }[];
}

const statusBadge: Record<string, string> = {
  new: 'bg-sky-50 text-sky-700 border-sky-200',
  contacted: 'bg-violet-50 text-violet-700 border-violet-200',
  qualified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  converted: 'bg-amber-50 text-amber-700 border-amber-200',
  lost: 'bg-rose-50 text-rose-700 border-rose-200',
};

const LEAD_COLORS: Record<string, string> = {
  new: '#0ea5e9',
  contacted: '#8b5cf6',
  qualified: '#10b981',
  converted: '#f59e0b',
  lost: '#f43f5e',
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/dashboard/stats');
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      </AppLayout>
    );
  }

  const overview = stats?.overview;

  const leadStatusData =
    stats?.charts.leadsByStatus?.map(item => ({
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      value: item.value,
      fill: LEAD_COLORS[item.name] || '#71717a',
    })) || [];

  return (
    <AppLayout>
      <Header
        title="Dashboard"
        description="Your coworking business at a glance"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <div className="space-y-8">
        {/* Hero Stats */}
        <div className="grid gap-px overflow-hidden rounded-2xl border bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Spaces
            </span>
            <p className="mt-2 text-4xl font-light tabular-nums">
              {overview?.totalSpaces || 0}
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              <span className="font-medium text-emerald-600">
                {overview?.activeSpaces || 0}
              </span>{' '}
              active ·{' '}
              <span className="font-medium text-amber-600">
                {overview?.pendingSpaces || 0}
              </span>{' '}
              pending
            </p>
          </div>

          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Leads
            </span>
            <p className="mt-2 text-4xl font-light tabular-nums">
              {overview?.totalLeads || 0}
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              <span className="font-medium text-sky-600">
                {overview?.newLeads || 0}
              </span>{' '}
              new ·{' '}
              <span className="font-medium text-emerald-600">
                {overview?.qualifiedLeads || 0}
              </span>{' '}
              qualified
            </p>
          </div>

          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Locations
            </span>
            <p className="mt-2 text-4xl font-light tabular-nums">
              {overview?.totalLocations || 0}
            </p>
            <p className="mt-3 text-sm text-neutral-600">Cities in Kerala</p>
          </div>

          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Conversion
            </span>
            <p className="mt-2 text-4xl font-light tabular-nums">
              {overview?.conversionRate || '0%'}
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              {overview?.convertedLeads || 0} leads converted
            </p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Space Types */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-medium text-neutral-900">
              Space Types
            </h2>
            <div className="mt-4 space-y-3">
              {stats?.charts.spacesByType &&
              stats.charts.spacesByType.length > 0 ? (
                stats.charts.spacesByType.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0"
                  >
                    <span className="text-neutral-700">{item.name}</span>
                    <span className="text-lg font-medium tabular-nums">
                      {item.value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-500">No spaces yet</p>
              )}
            </div>
          </div>

          {/* Lead Pipeline */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-medium text-neutral-900">
              Lead Pipeline
            </h2>
            {leadStatusData.length > 0 ? (
              <div className="mt-4 flex items-center gap-6">
                <div className="h-40 w-40 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {leadStatusData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          fontSize: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e5e5',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {leadStatusData.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="flex-1 text-neutral-600">
                        {item.name}
                      </span>
                      <span className="font-medium tabular-nums">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-neutral-500">No leads yet</p>
            )}
          </div>
        </div>

        {/* Location Distribution */}
        {stats?.charts.spacesByCity && stats.charts.spacesByCity.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-neutral-900">
              Spaces by Location
            </h2>
            <div className="mt-4 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.charts.spacesByCity}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#737373' }}
                  />
                  <Tooltip
                    contentStyle={{
                      fontSize: '12px',
                      borderRadius: '6px',
                      border: '1px solid #e5e5e5',
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#18181b"
                    radius={[3, 3, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div>
          <h2 className="text-sm font-medium text-neutral-900">
            Recent Enquiries
          </h2>
          {stats?.recentLeads && stats.recentLeads.length > 0 ? (
            <div className="mt-4 overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-neutral-50 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    <th className="px-4 py-3">Lead</th>
                    <th className="px-4 py-3">Space</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {stats.recentLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-neutral-50/50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-neutral-900">
                          {lead.name}
                        </p>
                        <p className="text-xs text-neutral-500">{lead.email}</p>
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {lead.enquiredFor}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {lead.spaceType}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Badge
                          variant="outline"
                          className={`font-normal ${statusBadge[lead.status] || ''}`}
                        >
                          {lead.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-neutral-500">No enquiries yet</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
