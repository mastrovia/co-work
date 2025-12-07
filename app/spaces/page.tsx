'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { SpacesFilters } from '@/components/spaces/spaces-filters';
import { SpacesTable } from '@/components/spaces/spaces-table';
import { api } from '@/lib/api';
import { Loader2, Building2, Plus } from 'lucide-react';
import { ISpace } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function SpacesContent() {
  const searchParams = useSearchParams();
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpaces = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      const { data } = await api.get(`/spaces?${params.toString()}`);
      if (data.success) {
        setSpaces(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch spaces:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/spaces/${id}`);
      fetchSpaces();
    } catch (error) {
      console.error('Failed to delete space', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50">
        <Building2 className="h-10 w-10 text-neutral-300" />
        <p className="mt-3 text-sm font-medium text-neutral-600">
          No spaces yet
        </p>
        <p className="mt-1 text-sm text-neutral-400">
          Create your first coworking space
        </p>
        <Link href="/spaces/create" className="mt-4">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Space
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <SpacesFilters />

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200">
        <SpacesTable spaces={spaces} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default function SpacesPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <Header
        title="Coworking Spaces"
        description="Manage your coworking spaces, virtual offices, and private offices"
        breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Spaces' }]}
        action={{
          label: 'Add Space',
          onClick: () => router.push('/spaces/create'),
        }}
      />

      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
          </div>
        }
      >
        <SpacesContent />
      </Suspense>
    </AppLayout>
  );
}
