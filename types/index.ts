import { SpaceFormData } from '@/lib/validations/space';

export interface ISpace extends Omit<SpaceFormData, 'city'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  city: any; // Can be string ID or populated Location object
  _id: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
