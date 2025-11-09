export interface CoworkingSpace {
  id: string;
  name: string;
  type: 'Coworking Space' | 'Virtual Office' | 'Private Office';
  location: string;
  capacity: string;
  priceRange: string;
  status: boolean;
  image: string;
}

export const mockSpaces: CoworkingSpace[] = [
  {
    id: '1',
    name: 'WorkHub Kochi',
    type: 'Coworking Space',
    location: 'Kochi',
    capacity: '50 persons',
    priceRange: '₹5,000 - ₹15,000',
    status: true,
    image: '/placeholder-space-1.jpg',
  },
  {
    id: '2',
    name: 'Virtual Office Pro',
    type: 'Virtual Office',
    location: 'Trivandrum',
    capacity: '20 persons',
    priceRange: '₹3,000 - ₹8,000',
    status: true,
    image: '/placeholder-space-2.jpg',
  },
  {
    id: '3',
    name: 'Executive Suites',
    type: 'Private Office',
    location: 'Kozhikode',
    capacity: '15 persons',
    priceRange: '₹20,000 - ₹50,000',
    status: false,
    image: '/placeholder-space-3.jpg',
  },
];

export const spaceTypes = [
  'All Types',
  'Coworking Space',
  'Virtual Office',
  'Private Office',
];
export const cities = [
  'All Cities',
  'Kochi',
  'Trivandrum',
  'Kozhikode',
  'Thrissur',
  'Kannur',
];
export const statuses = ['All Status', 'Active', 'Inactive'];
