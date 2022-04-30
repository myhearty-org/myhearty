import { connectHits } from 'react-instantsearch-dom';

type CustomHitsProps = {
  hits: any[];
  hitComponent: React.ComponentType<any>;
};

function CustomHits({ hits, hitComponent: HitComponent }: CustomHitsProps) {
  return (
    <div className="grid-col-1 grid auto-rows-max gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3">
      {hits.map((hit) => (
        <HitComponent key={hit.id} hit={hit} />
      ))}
    </div>
  );
}

export const Hits = connectHits(CustomHits);
