import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { forwardRef } from 'react';

const data = [
  { value: 'animal_welfare', label: 'Animal Welfare' },
  { value: 'arts_heritage', label: 'Arts & Heritage' },
  { value: 'children_youth', label: 'Children & Youth' },
  { value: 'community', label: 'Community' },
  { value: 'disability', label: 'Disability' },
  { value: 'education', label: 'Education' },
  { value: 'elderly', label: 'Elderly' },
  { value: 'environment', label: 'Environment' },
  { value: 'families', label: 'Families' },
  { value: 'health', label: 'Health' },
  { value: 'humanitarian', label: 'Humanitarian' },
  { value: 'social_service', label: 'Social Service' },
  { value: 'sports', label: 'Sports' },
  { value: 'women_girls', label: 'Women & Girls' },
];

export const CategoriesMultiSelect = forwardRef<HTMLInputElement, Omit<MultiSelectProps, 'data'>>(
  ({ defaultValue, ...props }, ref) => {
    defaultValue = toCategoryValues(defaultValue);

    return (
      <MultiSelect
        className="md:grid md:grid-cols-12 md:gap-x-4"
        classNames={{
          label: 'md:col-span-4',
          wrapper: 'md:col-span-8',
        }}
        ref={ref}
        data={data}
        label="Categories"
        defaultValue={defaultValue}
        searchable
        clearable
        clearButtonLabel="Clear categories"
        dropdownComponent="div"
        {...props}
      />
    );
  }
);

CategoriesMultiSelect.displayName = 'CategoriesMultiSelect';

export function toCategoryValues(categories?: string[]) {
  if (!categories) return categories;

  return categories.map((label) => data.find((category) => category.label === label)!.value);
}
