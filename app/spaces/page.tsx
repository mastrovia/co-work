'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { SpacesFilters } from '@/components/spaces/spaces-filters';
import { SpacesTable } from '@/components/spaces/spaces-table';
import { SpacesPagination } from '@/components/spaces/spaces-pagination';
import { mockSpaces } from '@/lib/data/spaces';

export default function SpacesPage() {
  return (
    <AppLayout>
      <Header
        title="Coworking Space Management"
        description="Create, list, and manage coworking spaces, virtual offices, and private offices"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Coworking Spaces' }]}
        action={{
          label: 'Add New Space',
          onClick: () => console.log('Add new space clicked'),
        }}
      />

      {/* White Background Container with Full Height */}
      <div className="flex min-h-[calc(100vh-240px)] flex-col rounded-lg bg-white">
        {/* Filters Section - Inside white container */}
        <div className="border-b p-6">
          <SpacesFilters />
        </div>

        {/* Table Section - Grows to fill available space */}
        <div className="flex-1 overflow-auto p-6">
          <SpacesTable spaces={mockSpaces} />
        </div>

        {/* Pagination - Fixed at bottom */}
        <div className="border-t px-6 py-4">
          <SpacesPagination
            currentPage={1}
            totalPages={1}
            totalEntries={3}
            startEntry={1}
            endEntry={3}
          />
        </div>
      </div>
    </AppLayout>
  );
}
