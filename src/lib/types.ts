export type User = {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
};

export type Organization = {
  id: string;
  name: string;
  page_url: string;
  location: string;
  email: string;
  contact_no: string;
  website_url: string;
  facebook_url: string;
  youtube_url: string;
  person_in_charge_name: string;
  avatar_url: string;
  video_url: string;
  image_url: string;
  charity: boolean;
};

export type FundraisingCampaign = {
  id: string;
  name: string;
  page_url: string;
  target_amount: number;
  total_raised_amount: number;
  donor_count: number;
  about_campaign: string;
  categories: string[];
  image_url: string;
  youtube_url: string;
  start_datetime: string;
  end_datetime: string;
  published: boolean;
  organization: Organization;
};
