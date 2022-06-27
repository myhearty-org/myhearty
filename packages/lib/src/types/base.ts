export type User = {
  id: number;
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
  id: number;
  name: string;
  slug: string;
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
  categories?: string[];
  aboutUs?: string;
  programmesSummary?: string;
  charity: boolean;
  stripeOnboarded?: boolean;
};

export type Member = {
  id: number;
  email: string;
  organizationId: string;
  admin: boolean;
  createdAt: string;
};

export type FundraisingCampaign = {
  id: number;
  name: string;
  slug: string;
  pageUrl: string;
  targetAmount: number;
  totalRaisedAmount: number;
  donorCount: number;
  aboutCampaign: string;
  categories: string[];
  imageUrl: string;
  imageData: string;
  youtubeUrl: string;
  startDatetime: string;
  endDatetime: string;
  published: boolean;
  organization: Organization;
};

export type Donation = {
  id: number;
  donationId: string;
  amount: string;
  grossAmount: string;
  fee: string;
  netAmount: string;
  paymentMethod: string;
  status: string;
  completedAt: string;
  fundraisingCampaign: FundraisingCampaign;
};

export type VolunteerEvent = {
  id: number;
  name: string;
  slug: string;
  pageUrl: string;
  openings: number;
  volunteerCount: number;
  location: string;
  aboutEvent: string;
  categories: string[];
  imageUrl: string;
  imageData: string;
  youtubeUrl: string;
  startDatetime: string;
  endDatetime: string;
  applicationDeadline: string;
  published: boolean;
  applicationClosed: boolean;
  organization: Organization;
};

export type VolunteerApplication = {
  id: number;
  status: string;
  statusUpdatedAt: string;
  attendance: string;
  attendanceUpdatedAt: string;
  volunteerEventId: number;
  volunteerId: number;
  volunteerEvent: VolunteerEvent;
};

export type CharitableAid = {
  id: number;
  name: string;
  slug: string;
  pageUrl: string;
  openings: number;
  receiverCount: number;
  location: string;
  aboutAid: string;
  categories: string[];
  imageUrl: string;
  imageData: string;
  youtubeUrl: string;
  applicationDeadline: string;
  published: boolean;
  applicationClosed: boolean;
  organization: Organization;
};

export type CharitableAidApplication = {
  id: number;
  status: string;
  statusUpdatedAt: string;
  reason: string;
  charitableAidId: number;
  receiverId: number;
  charitableAid: CharitableAid;
};
