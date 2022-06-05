import { Badge } from '@mantine/core';
import { CATEGORY_BADGES } from '@myhearty/lib/constants/badges';
import cn from 'classnames';
import sortBy from 'lodash/sortBy';

type CategoriesCardProps = {
  categories: string[];
};

export function CategoriesCard({ categories }: CategoriesCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {sortBy(categories).map((category, i) => {
          const Icon = CATEGORY_BADGES[category].icon;
          const icon = <Icon className={CATEGORY_BADGES[category].textColor} />;

          return (
            <Badge
              key={i}
              className={cn(CATEGORY_BADGES[category].backgroundColor, CATEGORY_BADGES[category].textColor)}
              leftSection={icon}>
              {category}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
