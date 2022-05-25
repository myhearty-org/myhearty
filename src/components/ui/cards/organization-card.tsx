import { Avatar } from '@components/ui/avatar';
import {
  GlobeAltIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { Organization } from '@lib/types';

type OrganizationCardProps = {
  organization: Organization;
};

export function OrganizationCard({ organization }: OrganizationCardProps) {
  const { name, location, email, contactNo, websiteUrl, personInChargeName, avatarUrl } = organization;

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Organization</h2>
      <div className="flex">
        <span className="relative mr-3 flex-shrink-0">
          <Avatar src={avatarUrl} alt="Organization avatar" size={8} />
        </span>
        <span className="min-w-0 break-words text-base font-medium">By {name}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex">
          <UserCircleIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="min-w-0 break-words text-sm">{personInChargeName}</span>
        </div>
        <div className="flex">
          <PhoneIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="min-w-0 break-words text-sm">
            <a className="hover:text-blue-600 hover:underline" href={`tel:${contactNo}`}>
              {contactNo}
            </a>
          </span>
        </div>
        <div className="flex">
          <MailIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="min-w-0 break-words text-sm">
            <a className="hover:text-blue-600 hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          </span>
        </div>
        <div className="flex">
          <GlobeAltIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="min-w-0 break-words text-sm">
            <a
              className="hover:text-blue-600 hover:underline"
              href={websiteUrl}
              target="_blank"
              rel="noreferrer">
              {websiteUrl}
            </a>
          </span>
        </div>
        <div className="flex">
          <LocationMarkerIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="min-w-0 break-words text-sm">{location}</span>
        </div>
      </div>
    </div>
  );
}
