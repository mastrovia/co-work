'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { spaceTypes, cities, statuses } from '@/lib/data/spaces';

export function SpacesFilters() {
  return (
    <div className="space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search spaces..." className="pl-9" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-4">
          <Select defaultValue="all-types">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {spaceTypes.map(type => (
                <SelectItem
                  key={type}
                  value={type.toLowerCase().replace(/\s+/g, '-')}
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="all-cities">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem
                  key={city}
                  value={city.toLowerCase().replace(/\s+/g, '-')}
                >
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="all-status">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem
                  key={status}
                  value={status.toLowerCase().replace(/\s+/g, '-')}
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Show Entries */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">entries</span>
          </div>
        </div>
      </div>
    </div>
  );
}
