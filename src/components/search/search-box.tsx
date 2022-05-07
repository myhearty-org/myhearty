import { SearchIcon } from '@heroicons/react/solid';
import { useBreakpoint, useHasMounted } from '@hooks/index';
import { ChangeEvent, useRef, useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

type CustomSearchBoxProps = {
  currentRefinement: any;
  refine: any;
  placeholder: string;
};

function CustomSearchBox({ currentRefinement, refine, placeholder = '' }: CustomSearchBoxProps) {
  const [value, setValue] = useState<any>(currentRefinement);
  const debouncedRefineValueRef = useRef<any>();

  function onChangeDebounced(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    clearTimeout(debouncedRefineValueRef.current);

    debouncedRefineValueRef.current = setTimeout(() => {
      refine(value);
    }, 450);

    setValue(value);
  }

  const hasMounted = useHasMounted();
  const { sm } = useBreakpoint();

  return (
    <form
      noValidate
      action=""
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full p-0.5">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <SearchIcon className="h-6 w-6 text-gray-500" />
        </div>
        <input
          type="search"
          value={value}
          onChange={onChangeDebounced}
          placeholder={hasMounted ? (sm ? 'Search' : placeholder) : 'Search'}
          className="w-full rounded-none border-transparent bg-white px-5 py-3 pl-10 text-xs text-black placeholder-gray-600 transition hover:bg-opacity-60 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />
      </div>
    </form>
  );
}

export const SearchBox = connectSearchBox(CustomSearchBox);
