import { Button } from '@components/ui/button';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

type ClearRefinementsComponentProps = {
  items: any[];
  refine: any;
};

export function ClearRefinementsComponent({ items, refine }: ClearRefinementsComponentProps) {
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

export const ClearRefinements = connectCurrentRefinements(ClearRefinementsComponent);
