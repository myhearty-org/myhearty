import { LocationMarkerIcon } from '@heroicons/react/solid';

type LocationCardProps = {
  location: string;
};

export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Location</h2>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <LocationMarkerIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
    </div>
  );
}
