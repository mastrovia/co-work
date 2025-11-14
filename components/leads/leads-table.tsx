'use client';

import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LeadDetailModal } from './lead-detail-modal';
import type { Lead } from '@/lib/data/leads';

interface LeadsTableProps {
  leads: Lead[];
}

const statusConfig = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-700' },
  contacted: {
    label: 'Contacted',
    className: 'bg-purple-100 text-purple-700',
  },
  qualified: {
    label: 'Qualified',
    className: 'bg-green-100 text-green-700',
  },
  converted: {
    label: 'Converted',
    className: 'bg-teal-100 text-teal-700',
  },
  lost: { label: 'Lost', className: 'bg-red-100 text-red-700' },
};

export function LeadsTable({ leads }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleClosModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      console.log('Delete lead:', leadId);
      // Handle delete logic here
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Checkbox />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Enquired For
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map(lead => (
                <tr
                  key={lead.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <Checkbox />
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {lead.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {lead.phone}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {lead.email}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {lead.enquiredFor}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lead.spaceType}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {lead.date}
                  </td>
                  <td className="px-4 py-4">
                    <Select
                      defaultValue={lead.status}
                      onValueChange={value => {
                        console.log('Status changed to:', value);
                        // Handle status change here
                      }}
                    >
                      <SelectTrigger className="h-auto w-auto border-0 bg-transparent p-0 focus:ring-0">
                        <Badge
                          variant="secondary"
                          className={statusConfig[lead.status].className}
                        >
                          {statusConfig[lead.status].label}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700"
                          >
                            New
                          </Badge>
                        </SelectItem>
                        <SelectItem value="contacted">
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700"
                          >
                            Contacted
                          </Badge>
                        </SelectItem>
                        <SelectItem value="qualified">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700"
                          >
                            Qualified
                          </Badge>
                        </SelectItem>
                        <SelectItem value="converted">
                          <Badge
                            variant="secondary"
                            className="bg-teal-100 text-teal-700"
                          >
                            Converted
                          </Badge>
                        </SelectItem>
                        <SelectItem value="lost">
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-700"
                          >
                            Lost
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewLead(lead)}
                        className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700"
                        title="Delete lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LeadDetailModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={handleClosModal}
      />
    </>
  );
}
