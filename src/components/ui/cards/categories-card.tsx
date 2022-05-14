import { CATEGORY_BADGES } from '@lib/constants';
import cn from 'classnames';
import sortBy from 'lodash/sortBy';

type CategoriesCardProps = {
  categories: string[];
};

export function CategoriesCard({ categories }: CategoriesCardProps) {
  return (
    <div className="w-full space-y-4 rounded-2xl border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {sortBy(categories).map((category, i) => {
          const Icon = CATEGORY_BADGES[category].icon;

          return (
            <span
              key={i}
              className={cn(
                'mr-2 flex rounded-lg px-2.5 py-0.5 text-sm font-medium',
                CATEGORY_BADGES[category].backgroundColor,
                CATEGORY_BADGES[category].textColor
              )}>
              <Icon className={cn('mr-3 h-6 w-6 flex-shrink-0', CATEGORY_BADGES[category].textColor)} />
              {category}
            </span>
          );
        })}
      </div>
    </div>
  );
}
