export type User = {
  id: string;
  name: string;
  email: string;
  contactNo?: string;
  address?: string;
  birthDate?: string;
  gender?: string;
  avatarUrl: string;
};

export type UserProfile = {
  name: string;
  contactNo: string;
  address: string;
  birthDate: string;
  gender: string;
};

export type Organization = {
  id: string;
  name: string;
  pageUrl: string;
  location: string;
  email: string;
  contactNo: string;
  websiteUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  personInChargeName: string;
  avatarUrl: string;
  videoUrl: string;
  imageUrl: string;
  charity: boolean;
};

export type FundraisingCampaign = {
  id: string;
  name: string;
  pageUrl: string;
  targetAmount: number;
  totalRaisedAmount: number;
  donorCount: number;
  aboutCampaign: string;
  categories: string[];
  imageUrl: string;
  youtubeUrl: string;
  startDatetime: string;
  endDatetime: string;
  published: boolean;
  organization: Organization;
};

export type VolunteerEvent = {
  id: string;
  name: string;
  pageUrl: string;
  openings: number;
  volunteerCount: number;
  location: string;
  aboutEvent: string;
  categories: string[];
  imageUrl: string;
  youtubeUrl: string;
  startDatetime: string;
  endDatetime: string;
  applicationDeadline: string;
  published: boolean;
  applicationClosed: boolean;
  organization: Organization;
};
