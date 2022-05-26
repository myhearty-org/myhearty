import {
  AcademicCapIcon,
  GlobeIcon,
  HandIcon,
  HeartIcon,
  LibraryIcon,
  SupportIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import {
  ElderlyIcon,
  EscalatorWarningIcon,
  FamilyRestroomIcon,
  FemaleIcon,
  PawPrintIcon,
  PoolIcon,
  WheelchairIcon,
} from '@myhearty/ui/icons';

type CategoryBadgeType = {
  [category: string]: { icon: any; backgroundColor: string; textColor: string };
};

export const CATEGORY_BADGES: CategoryBadgeType = {
  'Animal Welfare': {
    icon: PawPrintIcon,
    backgroundColor: 'bg-yellow-100',
    textColor: 'text-yellow-600 fill-yellow-600',
  },
  'Arts & Heritage': {
    icon: LibraryIcon,
    backgroundColor: 'bg-amber-100',
    textColor: 'text-amber-800 fill-amber-800',
  },
  'Children & Youth': {
    icon: EscalatorWarningIcon,
    backgroundColor: 'bg-purple-100',
    textColor: 'text-purple-600 fill-purple-600',
  },
  Community: {
    icon: UserGroupIcon,
    backgroundColor: 'bg-lime-100',
    textColor: 'text-lime-600 fill-lime-600',
  },
  Disability: {
    icon: WheelchairIcon,
    backgroundColor: 'bg-gray-100',
    textColor: 'text-gray-600 fill-gray-600',
  },
  Education: {
    icon: AcademicCapIcon,
    backgroundColor: 'bg-teal-100',
    textColor: 'text-teal-600 fill-teal-600',
  },
  Elderly: {
    icon: ElderlyIcon,
    backgroundColor: 'bg-blue-100',
    textColor: 'text-blue-600 fill-blue-600',
  },
  Environment: {
    icon: GlobeIcon,
    backgroundColor: 'bg-green-100',
    textColor: 'text-green-600 fill-green-600',
  },
  Families: {
    icon: FamilyRestroomIcon,
    backgroundColor: 'bg-fuchsia-100',
    textColor: 'text-fuchsia-600 fill-fuchsia-600',
  },
  Health: {
    icon: HeartIcon,
    backgroundColor: 'bg-pink-100',
    textColor: 'text-pink-600 fill-pink-600',
  },
  Humanitarian: {
    icon: SupportIcon,
    backgroundColor: 'bg-rose-100',
    textColor: 'text-rose-600 fill-rose-600',
  },
  'Social Service': {
    icon: HandIcon,
    backgroundColor: 'bg-sky-100',
    textColor: 'text-sky-600 fill-sky-600',
  },
  Sports: {
    icon: PoolIcon,
    backgroundColor: 'bg-orange-100',
    textColor: 'text-orange-600 fill-orange-600',
  },
  'Women & Girls': {
    icon: FemaleIcon,
    backgroundColor: 'bg-red-100',
    textColor: 'text-red-600 fill-red-600',
  },
};
