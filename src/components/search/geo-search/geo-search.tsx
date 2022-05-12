import { LocationSearchBox } from './location-search-box';
import { CrosshairIcon } from '@components/ui/icons';
import { showToast } from '@utils/show-toast';
import { useEffect, useState } from 'react';
import { Configure } from 'react-instantsearch-dom';
import { useToggle } from 'react-use';

export function GeoSearch() {
  const [useCurrentLocation, toggleUseCurrentLocation] = useToggle(false);
  const [latitudeLongitude, setLatitudeLongitude] = useState('');

  useEffect(() => {
    if (!useCurrentLocation) {
      setLatitudeLongitude('');
      return;
    }

    if ('geolocation' in navigator) {
      const success = (position: GeolocationPosition) => {
        setLatitudeLongitude(`${position.coords.latitude}, ${position.coords.longitude}`);
      };

      const error = () => {
        toggleUseCurrentLocation();
        showToast('Unable to retrieve your location. Please enable location access and try again.', 'error');
      };

      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      toggleUseCurrentLocation();
      showToast('Geolocation is not supported by your browser.', 'error');
    }
  }, [useCurrentLocation, toggleUseCurrentLocation]);

  function onPlaceSelect(geoJson: any) {
    if (geoJson) {
      setLatitudeLongitude(`${geoJson.properties.lat}, ${geoJson.properties.lon}`);
    } else {
      setLatitudeLongitude('');
    }
  }

  return (
    <div className="flex w-full p-0.5">
      {latitudeLongitude !== '' && <Configure aroundLatLng={latitudeLongitude} aroundRadius={45_000} />}
      <div className="flex-1">
        <LocationSearchBox
          placeholder={'Search or use current location'}
          placeSelect={onPlaceSelect}
          limit={5}
          filterByCountryCode={['my']}
          biasByCountryCode={['my']}
          skipDetails
        />
      </div>
      <button className="ml-1 flex items-center justify-center p-2" onClick={toggleUseCurrentLocation}>
        {!useCurrentLocation && <CrosshairIcon className="h-6 w-6 fill-gray-500" />}
        {useCurrentLocation && <CrosshairIcon className="h-6 w-6 fill-pink-600" />}
      </button>
    </div>
  );
}
