'use client';

import { Download } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LeadsFilters } from '@/components/leads/leads-filters';
import { LeadsTable } from '@/components/leads/leads-table';
import { LeadsPagination } from '@/components/leads/leads-pagination';
import { leads } from '@/lib/data/leads';

export default function LeadsPage() {
  const stats = [
    {
      label: 'Total Enquiries',
      value: '156',
      className: 'bg-white',
    },
    {
      label: 'Qualified',
      value: '45',
      className: 'bg-white',
    },
    {
      label: 'New',
      value: '32',
      className: 'bg-white',
    },
    {
      label: 'Converted',
      value: '28',
      className: 'bg-white',
    },
  ];

  return (
    <AppLayout>
      <Header
        title="Lead Management"
        description="View and manage all leads across your spaces"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Leads' }]}
        action={{
          label: 'Export Report',
          icon: Download,
          onClick: () => console.log('Export report'),
          className: 'bg-green-500 text-white hover:bg-green-600',
        }}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.label} className={`p-6 ${stat.className}`}>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-lg bg-white p-6">
        <LeadsFilters />
      </div>

      {/* Table */}
      <LeadsTable leads={leads} />

      {/* Pagination */}
      <LeadsPagination
        currentPage={1}
        totalPages={1}
        totalEntries={5}
        startEntry={1}
        endEntry={5}
      />
    </AppLayout>
  );
}
