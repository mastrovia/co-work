'use client';

import { Button } from '@/components/ui/button';

interface LeadsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  startEntry: number;
  endEntry: number;
}

export function LeadsPagination({
  currentPage,
  totalPages,
  totalEntries,
  startEntry,
  endEntry,
}: LeadsPaginationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-white px-6 py-4 md:flex-row">
      <p className="text-sm text-gray-600">
        Showing {startEntry} to {endEntry} of {totalEntries} entries
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          variant={currentPage === 1 ? 'default' : 'outline'}
          className={
            currentPage === 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-white'
          }
        >
          1
        </Button>
        {totalPages > 1 && (
          <Button variant="outline" disabled={currentPage === totalPages}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
