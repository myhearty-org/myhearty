import { Button } from '@components/ui/button';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

type CustomClearRefinementsProps = {
  items: any[];
  refine: any;
};

export function CustomClearRefinements({ items, refine }: CustomClearRefinementsProps) {
  return (
    <Button
      className="w-full justify-center"
      type="button"
      color="secondary"
      onClick={() => refine(items)}
      disabled={!items.length}>
      Clear all filters
    </Button>
  );
}

export const ClearRefinements = connectCurrentRefinements(CustomClearRefinements);
