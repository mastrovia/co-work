export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiredFor: string; // Workspace name
  spaceType: string;
  numberOfSeats: number;
  location: string;
  message?: string;
  date: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
}

export const leads: Lead[] = [
  {
    id: 'LD-2025-001',
    name: 'Anjali Sharma',
    email: 'anjali.s@example.com',
    phone: '0123 456 789',
    enquiredFor: 'WorkHub Kochi',
    spaceType: 'Hot Desk',
    numberOfSeats: 5,
    location: 'Kochi',
    message: 'Looking for a flexible workspace for my startup team',
    date: '2025-10-28',
    status: 'qualified',
  },
  {
    id: 'LD-2025-002',
    name: 'Vikram Patel',
    email: 'vikram.p@example.com',
    phone: '0123 456 790',
    enquiredFor: 'Executive Suites',
    spaceType: 'Private Office',
    numberOfSeats: 10,
    location: 'Trivandrum',
    message: 'Need a private office space for our new branch',
    date: '2025-10-27',
    status: 'new',
  },
  {
    id: 'LD-2025-003',
    name: 'Meera Nair',
    email: 'meera.n@example.com',
    phone: '0123 456 791',
    enquiredFor: 'Virtual Office Pro',
    spaceType: 'Virtual Office',
    numberOfSeats: 1,
    location: 'Kozhikode',
    message: 'Interested in virtual office services',
    date: '2025-10-26',
    status: 'contacted',
  },
  {
    id: 'LD-2025-004',
    name: 'Arjun Reddy',
    email: 'arjun.r@example.com',
    phone: '0123 456 792',
    enquiredFor: 'WorkHub Kochi',
    spaceType: 'Dedicated Desk',
    numberOfSeats: 3,
    location: 'Kochi',
    message: 'Looking for dedicated desks for my team',
    date: '2025-10-20',
    status: 'converted',
  },
  {
    id: 'LD-2025-005',
    name: 'Divya Kumar',
    email: 'divya.k@example.com',
    phone: '0123 456 793',
    enquiredFor: 'Executive Suites',
    spaceType: 'Meeting Room',
    numberOfSeats: 8,
    location: 'Thrissur',
    message: 'Need a meeting room for client presentations',
    date: '2025-10-15',
    status: 'lost',
  },
];
