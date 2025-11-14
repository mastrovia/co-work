import { z } from 'zod';

// Basic Info Schema
export const basicInfoSchema = z.object({
  spaceName: z
    .string()
    .min(1, 'Space name is required')
    .min(3, 'Space name must be at least 3 characters')
    .max(100, 'Space name must not exceed 100 characters'),
  spaceType: z.string().min(1, 'Space type is required'),
  city: z.string().min(1, 'City is required'),
  spaceCategory: z.string().min(1, 'Space category is required'),
  shortDescription: z
    .string()
    .min(1, 'Short description is required')
    .min(10, 'Short description must be at least 10 characters')
    .max(200, 'Short description must not exceed 200 characters'),
  longDescription: z
    .string()
    .min(1, 'Long description is required')
    .min(50, 'Long description must be at least 50 characters')
    .max(1000, 'Long description must not exceed 1000 characters'),
});

// TypeScript type inferred from schema
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

// Space type options
export const spaceTypeOptions = [
  { value: 'coworking-space', label: 'Coworking Space' },
  { value: 'virtual-office', label: 'Virtual Office' },
  { value: 'private-office', label: 'Private Office' },
] as const;

// City options
export const cityOptions = [
  { value: 'kochi', label: 'Kochi' },
  { value: 'trivandrum', label: 'Trivandrum' },
  { value: 'kozhikode', label: 'Kozhikode' },
  { value: 'thrissur', label: 'Thrissur' },
  { value: 'kannur', label: 'Kannur' },
] as const;

// Category options
export const categoryOptions = [
  { value: 'premium', label: 'Premium' },
  { value: 'standard', label: 'Standard' },
  { value: 'budget', label: 'Budget' },
] as const;
