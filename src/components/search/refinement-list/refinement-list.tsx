import cn from 'classnames';
import { connectRefinementList, Highlight } from 'react-instantsearch-dom';

type CustomRefinementListProps = {
  items: any[];
  isFromSearch: boolean;
  refine: any;
  searchForItems: any;
  attribute: string;
  label: string;
};

function CustomRefinementList({
  items,
  isFromSearch,
  refine,
  searchForItems,
  attribute,
  label,
}: CustomRefinementListProps) {
  const searchableAttributes = ['categories'];

  return (
    <div>
      <label className="px-2 text-sm font-medium">{label}</label>
      {searchableAttributes.includes(attribute!) && (
        <div className="group relative">
          <div>
            <input
              type="search"
              className="w-full border border-transparent bg-transparent px-2 py-1 text-sm text-black placeholder-gray-600 transition focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder={`Search ${label}`}
              onChange={(event) => searchForItems(event.currentTarget.value)}
            />
          </div>
        </div>
      )}
      <ul>
        {items?.map((item) => (
          <Item key={item.label} item={item} isFromSearch={isFromSearch} refine={refine} />
        ))}
      </ul>
    </div>
  );
}

export const RefinementList = connectRefinementList(CustomRefinementList);

type ItemProps = {
  item: any;
  isFromSearch: boolean;
  refine: any;
};

function Item({ item, isFromSearch, refine }: ItemProps) {
  return (
    <li key={item.label}>
      <a
        className={cn(
          'block px-2 py-1 text-sm transition duration-150 ease-in-out hover:bg-white',
          item.isRefined && 'font-semibold'
        )}
        onClick={(event) => {
          event.preventDefault();
          refine(item.value);
        }}>
        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            readOnly
            checked={item.isRefined}
            aria-label={item.label}
            className={cn(
              'pointer-events-none rounded-sm border-gray-300 bg-gray-200',
              item.isRefined && 'bg-pink-500'
            )}
          />
          <span className="whitespace-nowrap pl-2">
            {isFromSearch ? <Highlight attribute="label" hit={item} /> : item.label}
          </span>
          <span className="ml-2 rounded-sm bg-gray-200 px-1 text-xs">{item.count.toLocaleString()}</span>
        </label>
      </a>
    </li>
  );
}
