'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueTrendChart } from '@/components/dashboard/revenue-trend-chart';
import { SpaceTypeChart } from '@/components/dashboard/space-type-chart';
import { CityBookingsChart } from '@/components/dashboard/city-bookings-chart';
import { TopSpaces } from '@/components/dashboard/top-spaces';

export default function DashboardPage() {
  return (
    <AppLayout>
      <Header
        title="Dashboard"
        description="Welcome back! Here's what's happening with your spaces"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="₹4.2L"
          change="+12.5%"
          trend="up"
        />
        <StatCard
          title="Active Bookings"
          value="156"
          change="+8.2%"
          trend="up"
        />
        <StatCard title="Total Spaces" value="24" change="+2" trend="up" />
        <StatCard
          title="Occupancy Rate"
          value="87%"
          change="-3.1%"
          trend="down"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RevenueTrendChart />
        <SpaceTypeChart />
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CityBookingsChart />
        <TopSpaces />
      </div>
    </AppLayout>
  );
}
