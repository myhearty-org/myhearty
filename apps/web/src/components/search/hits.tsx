import { connectHits } from 'react-instantsearch-dom';

type CustomHitsProps = {
  hits: any[];
  hitComponent: React.ComponentType<any>;
};

function CustomHits({ hits, hitComponent: HitComponent }: CustomHitsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-8 py-6">
      {hits.map((hit) => (
        <HitComponent key={hit.id} hit={hit} />
      ))}
    </div>
  );
}

export const Hits = connectHits(CustomHits);
