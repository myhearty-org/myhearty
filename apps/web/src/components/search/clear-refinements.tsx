import { Button } from '@mantine/core';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

type ClearRefinementsComponentProps = {
  items: any[];
  refine: any;
};

export function ClearRefinementsComponent({ items, refine }: ClearRefinementsComponentProps) {
  return (
    <Button variant="default" size="xs" fullWidth onClick={() => refine(items)} disabled={!items.length}>
      Clear all filters
    </Button>
  );
}

export const ClearRefinements = connectCurrentRefinements(ClearRefinementsComponent);
