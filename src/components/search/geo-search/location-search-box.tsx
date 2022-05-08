import { ByCountryCodeOptions, GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY!;

type LocationSearchBoxProps = {
  placeholder?: string;
  placeSelect: (value: any) => any;
  limit?: number;
  filterByCountryCode?: ByCountryCodeOptions;
  biasByCountryCode?: ByCountryCodeOptions;
  skipDetails?: boolean;
};

export function LocationSearchBox({
  placeholder: placeholderValue,
  placeSelect: placeSelectCallback,
  limit: limitValue,
  filterByCountryCode: filterByCountryCodeValue,
  biasByCountryCode: biasByCountryCodeValue,
  skipDetails: skipDetailsValue,
}: LocationSearchBoxProps) {
  let geocoderContainer: HTMLDivElement | null;
  let initialized = false;
  let geocoderAutocomplete: MutableRefObject<GeocoderAutocomplete | undefined> =
    useRef<GeocoderAutocomplete>();

  const placeSelectCallbackRef: MutableRefObject<((value: any) => {}) | undefined> =
    useRef<(value: any) => {}>();

  placeSelectCallbackRef.current = placeSelectCallback;

  const onSelect = useCallback((value: any) => {
    if (placeSelectCallbackRef.current) {
      placeSelectCallbackRef.current(value);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      if (geocoderAutocomplete.current) {
        geocoderAutocomplete.current.off('select', onSelect);
      }

      return;
    }

    initialized = true;

    geocoderAutocomplete.current = new GeocoderAutocomplete(
      geocoderContainer as HTMLDivElement,
      GEOAPIFY_API_KEY,
      {
        placeholder: placeholderValue || '',
        skipDetails: skipDetailsValue,
        debounceDelay: 450,
      }
    );

    geocoderAutocomplete.current.on('select', onSelect);
  }, []);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setLimit(limitValue as number);
    }
  }, [limitValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByCountry(filterByCountryCodeValue as ByCountryCodeOptions);
    }
  }, [filterByCountryCodeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByCountry(biasByCountryCodeValue as ByCountryCodeOptions);
    }
  }, [biasByCountryCodeValue]);

  return <div className="geocoder-container relative" ref={(el) => (geocoderContainer = el)} />;
}
