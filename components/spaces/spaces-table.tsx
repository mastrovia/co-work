'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ISpace } from '@/types';

interface SpacesTableProps {
  spaces: ISpace[];
  onDelete?: (id: string) => void;
}

const getTypeBadgeColor = (type: string): string => {
  switch (type) {
    case 'Coworking Space':
      return 'bg-emerald-50 text-emerald-700 border-0';
    case 'Virtual Office':
      return 'bg-blue-50 text-blue-700 border-0';
    case 'Private Office':
      return 'bg-purple-50 text-purple-700 border-0';
    default:
      return 'bg-neutral-100 text-neutral-700 border-0';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 border-0';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border-0';
    case 'inactive':
      return 'bg-neutral-100 text-neutral-600 border-0';
    default:
      return 'bg-neutral-100 text-neutral-600 border-0';
  }
};

export function SpacesTable({ spaces, onDelete }: SpacesTableProps) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/spaces/${id}/edit`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete?.(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-neutral-50 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
            <th className="px-4 py-3">Space</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {spaces.map(space => (
            <tr
              key={space._id || space.id}
              className="transition-colors hover:bg-neutral-50/50"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    {space.images && space.images[0] ? (
                      <Image
                        src={space.images[0]}
                        alt={space.spaceName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-xs font-semibold text-emerald-600">
                        {space.spaceName?.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-neutral-900">
                    {space.spaceName}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant="secondary"
                  className={getTypeBadgeColor(space.spaceType)}
                >
                  {space.spaceType}
                </Badge>
              </td>
              <td className="px-4 py-3 text-neutral-600">
                {typeof space.city === 'object' ? space.city?.name : space.city}
              </td>
              <td className="px-4 py-3 text-neutral-600">
                {space.pricing?.hotDesk ? (
                  <span className="font-medium">₹{space.pricing.hotDesk}</span>
                ) : (
                  <span className="text-neutral-400">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant="secondary"
                  className={getStatusBadge(space.status)}
                >
                  {space.status.charAt(0).toUpperCase() + space.status.slice(1)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-neutral-500 hover:text-neutral-900"
                    onClick={() =>
                      handleEdit(space._id || (space.id as string))
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-neutral-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() =>
                      handleDelete(
                        space._id || (space.id as string),
                        space.spaceName
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
