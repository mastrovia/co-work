'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  basicInfoSchema,
  type BasicInfoFormData,
  spaceTypeOptions,
  cityOptions,
  categoryOptions,
} from '@/lib/validations/space';

interface BasicInfoTabProps {
  onFormChange?: (data: BasicInfoFormData) => void;
  validateFormRef?: React.MutableRefObject<(() => Promise<boolean>) | null>;
}

export function BasicInfoTab({
  onFormChange,
  validateFormRef,
}: BasicInfoTabProps) {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    mode: 'onTouched',
    defaultValues: {
      spaceName: '',
      spaceType: '',
      city: '',
      spaceCategory: '',
      shortDescription: '',
      longDescription: '',
    },
  });

  const formValues = watch();
  const shortDescLength = watch('shortDescription')?.length || 0;
  const longDescLength = watch('longDescription')?.length || 0;

  // Expose validation function to parent
  React.useEffect(() => {
    if (validateFormRef) {
      validateFormRef.current = async () => {
        return await trigger();
      };
    }
  }, [validateFormRef, trigger]);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Space Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="spaceName"
            className="text-sm font-normal text-gray-700"
          >
            Space Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="spaceName"
            placeholder="Enter space name"
            className={
              errors.spaceName
                ? 'border-red-500 focus-visible:border-red-500'
                : ''
            }
            {...register('spaceName')}
          />
          {errors.spaceName && (
            <p className="text-xs text-red-500">{errors.spaceName.message}</p>
          )}
        </div>

        {/* Space Type */}
        <div className="space-y-1.5">
          <label
            htmlFor="spaceType"
            className="text-sm font-normal text-gray-700"
          >
            Space Type <span className="text-red-500">*</span>
          </label>
          <Select
            value={formValues.spaceType}
            onValueChange={value =>
              setValue('spaceType', value, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="spaceType"
              className={
                errors.spaceType ? 'border-red-500 focus:border-red-500' : ''
              }
            >
              <SelectValue placeholder="Select space type" />
            </SelectTrigger>
            <SelectContent>
              {spaceTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.spaceType && (
            <p className="text-xs text-red-500">{errors.spaceType.message}</p>
          )}
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label htmlFor="city" className="text-sm font-normal text-gray-700">
            City <span className="text-red-500">*</span>
          </label>
          <Select
            value={formValues.city}
            onValueChange={value =>
              setValue('city', value, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="city"
              className={
                errors.city ? 'border-red-500 focus:border-red-500' : ''
              }
            >
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cityOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* Space Category */}
        <div className="space-y-1.5">
          <label
            htmlFor="spaceCategory"
            className="text-sm font-normal text-gray-700"
          >
            Space Category <span className="text-red-500">*</span>
          </label>
          <Select
            value={formValues.spaceCategory}
            onValueChange={value =>
              setValue('spaceCategory', value, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="spaceCategory"
              className={
                errors.spaceCategory
                  ? 'border-red-500 focus:border-red-500'
                  : ''
              }
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.spaceCategory && (
            <p className="text-xs text-red-500">
              {errors.spaceCategory.message}
            </p>
          )}
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="shortDescription"
            className="text-sm font-normal text-gray-700"
          >
            Short Description <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-500">
            {shortDescLength}/200 characters
          </span>
        </div>
        <Textarea
          id="shortDescription"
          placeholder="Brief description of the space"
          className={`min-h-[80px] resize-none ${errors.shortDescription ? 'border-red-500 focus-visible:border-red-500' : ''}`}
          maxLength={200}
          {...register('shortDescription')}
        />
        {errors.shortDescription && (
          <p className="text-xs text-red-500">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      {/* Long Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="longDescription"
            className="text-sm font-normal text-gray-700"
          >
            Long Description <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-500">
            {longDescLength}/1000 characters
          </span>
        </div>
        <Textarea
          id="longDescription"
          placeholder="Detailed description of the space, facilities, and unique features"
          className={`min-h-[150px] resize-none ${errors.longDescription ? 'border-red-500 focus-visible:border-red-500' : ''}`}
          maxLength={1000}
          {...register('longDescription')}
        />
        {errors.longDescription && (
          <p className="text-xs text-red-500">
            {errors.longDescription.message}
          </p>
        )}
        <p className="text-xs text-gray-500">
          Describe your space in detail. Include information about the location,
          facilities, and what makes it unique.
        </p>
      </div>
    </div>
  );
}
