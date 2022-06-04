import { SearchResultCard } from './search';
import { Slider } from '@components/ui/slider';
import { CharitableAid } from '@myhearty/lib/types';
import { typesense } from '@utils/typesense';
import compact from 'lodash/compact';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useState } from 'react';

type CharitableAidsSliderProps = {
  charitableAid: CharitableAid;
};

export function CharitableAidsSlider({ charitableAid }: CharitableAidsSliderProps) {
  const [hits, setHits] = useState<any>();

  useEffect(() => {
    async function searchCharitableAids() {
      const categoriesFilter = charitableAid.categories.map((category) => `\`${category}\``).join(',');

      const searchRequests = {
        searches: [
          {
            q: '*',
            query_by: 'name,organization,location',
            filter_by: `organization:=\`${charitableAid.organization.name}\``,
          },
          {
            q: '*',
            query_by: 'name,organization,location',
            filter_by: `categories:=[${categoriesFilter}]`,
          },
        ],
      };

      const commonSearchParams = {
        collection: 'charitable_aids',
        page: 1,
        per_page: 12,
        limit_hits: 12,
        hidden_hits: charitableAid.id.toString(),
      };

      try {
        const { results } = await typesense.multiSearch.perform(searchRequests, commonSearchParams);

        let hits = Array.prototype.concat(...results.map((result) => result.hits));

        hits = compact(hits);
        hits = uniqBy(hits, (hit) => hit.document.id);
        hits = orderBy(hits, ['text_match'], ['desc']);
        hits = hits.slice(0, 12).map((hit) => hit.document);

        setHits(hits);
      } catch {}
    }
    searchCharitableAids();
  }, [charitableAid]);

  const options = {
    perView: 4,
    bound: true,
    rewind: false,
    breakpoints: {
      576: { perView: 1 },
      768: { perView: 2 },
      1400: { perView: 3 },
      1536: { perView: 4 },
    },
  };

  return (
    <Slider
      title="Other charitable aids you may like"
      items={hits}
      itemKey={(hit) => hit.id}
      options={options}
      renderItem={(hit) => <SearchResultCard hit={hit} />}
    />
  );
}
