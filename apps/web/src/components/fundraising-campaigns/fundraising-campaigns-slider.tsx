import { SearchResultCard } from './search';
import { Slider } from '@components/ui/slider';
import { FundraisingCampaign } from '@myhearty/lib/types';
import { typesense } from '@utils/typesense';
import compact from 'lodash/compact';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useState } from 'react';

type FundraisingCampaignsSliderProps = {
  fundraisingCampaign: FundraisingCampaign;
};

export function FundraisingCampaignsSlider({ fundraisingCampaign }: FundraisingCampaignsSliderProps) {
  const [hits, setHits] = useState<any>();

  useEffect(() => {
    async function searchFundraisingCampaigns() {
      const categoriesFilter = fundraisingCampaign.categories.map((category) => `\`${category}\``).join(',');

      const searchRequests = {
        searches: [
          {
            q: '*',
            query_by: 'name,organization,about_campaign',
            filter_by: `organization:=\`${fundraisingCampaign.organization.name}\``,
          },
          {
            q: '*',
            query_by: 'name,organization,about_campaign',
            filter_by: `categories:=[${categoriesFilter}]`,
          },
        ],
      };

      const commonSearchParams = {
        collection: 'fundraising_campaigns',
        page: 1,
        per_page: 12,
        limit_hits: 12,
        hidden_hits: fundraisingCampaign.id.toString(),
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
    searchFundraisingCampaigns();
  }, [fundraisingCampaign]);

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
      title="Other campaigns you may like"
      items={hits}
      itemKey={(hit) => hit.id}
      options={options}
      renderItem={(hit) => <SearchResultCard hit={hit} />}
    />
  );
}
