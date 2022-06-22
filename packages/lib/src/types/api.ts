import * as z from 'zod';

export const CreateOrganizationSchema = z.object({
  name: z.string().trim().max(63),
  location: z.string().trim().max(255),
  email: z.string().trim().email(),
  contactNo: z.string().trim().max(20),
  websiteUrl: z.string().trim().url(),
  personInChargeName: z.string().trim().max(63),
  aboutUs: z.string(),
  charity: z.boolean(),
  admin: z.object({
    email: z.string().trim().email(),
    password: z.string().min(6),
  }),
});

export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;

const FundraisingCampaignSchema = z.object({
  name: z.string().trim().max(255),
  categories: z.string().trim().array(),
  targetAmount: z.number().min(0),
  aboutCampaign: z.string().trim(),
  image: z.string(),
  endDatetime: z.string().refine((value) => new Date(value) > new Date(), {
    message: 'Please select an end date and time that is later than now.',
  }),
  published: z.boolean(),
});

export const CreateFundraisingCampaignSchema = FundraisingCampaignSchema.pick({ name: true });

export type CreateFundraisingCampaign = z.infer<typeof CreateFundraisingCampaignSchema>;

export const PublishFundraisingCampaignSchema = FundraisingCampaignSchema;

export type PublishFundraisingCampaign = z.infer<typeof PublishFundraisingCampaignSchema>;

const VolunteerEventSchema = z.object({
  name: z.string().trim().max(255),
  categories: z.string().trim().array(),
  openings: z.number().min(0),
  location: z.string().trim().max(255),
  aboutEvent: z.string().trim(),
  image: z.string(),
  startDatetime: z.string().refine((value) => new Date(value) > new Date(), {
    message: 'Please select a start date and time that is later than now.',
  }),
  endDatetime: z.string(),
  applicationDeadline: z.string().refine((value) => new Date(value) > new Date(), {
    message: 'Please select an application deadline that is later than now.',
  }),
  published: z.boolean(),
});

const VolunteerEventSchemaPartial = VolunteerEventSchema.partial();

const endDatetimeAfterStartDatetime = {
  check: function ({ startDatetime, endDatetime }: z.infer<typeof VolunteerEventSchemaPartial>) {
    if (!startDatetime || !endDatetime) return true;

    return new Date(endDatetime) > new Date(startDatetime);
  },
  message: {
    message: 'Please ensure end date and time is later than start date and time.',
    path: ['endDatetime'],
  },
};

const applicationDeadlineBeforeStartDatetime = {
  check: function ({ applicationDeadline, startDatetime }: z.infer<typeof VolunteerEventSchemaPartial>) {
    if (!applicationDeadline || !startDatetime) return true;

    return new Date(applicationDeadline) < new Date(startDatetime);
  },
  message: {
    message: 'Please ensure application deadline is earlier than start date and time.',
    path: ['applicationDeadline'],
  },
};

export const CreateVolunteerEventSchema = VolunteerEventSchema.pick({ name: true });

export type CreateVolunteerEvent = z.infer<typeof CreateVolunteerEventSchema>;

export const PublishVolunteerEventSchema = VolunteerEventSchema.refine(
  endDatetimeAfterStartDatetime.check,
  endDatetimeAfterStartDatetime.message
).refine(applicationDeadlineBeforeStartDatetime.check, applicationDeadlineBeforeStartDatetime.message);

export type PublishVolunteerEvent = z.infer<typeof PublishVolunteerEventSchema>;

const CharitableAidSchema = z.object({
  name: z.string().trim().max(255),
  categories: z.string().trim().array(),
  openings: z.number().min(0),
  location: z.string().trim().max(255),
  aboutAid: z.string().trim(),
  image: z.string(),
  applicationDeadline: z.string().refine((value) => new Date(value) > new Date(), {
    message: 'Please select an application deadline that is later than now.',
  }),
  published: z.boolean(),
});

export const CreateCharitableAidSchema = CharitableAidSchema.pick({ name: true });

export type CreateCharitableAid = z.infer<typeof CreateCharitableAidSchema>;

export const PublishCharitableAidSchema = CharitableAidSchema;

export type PublishCharitableAid = z.infer<typeof PublishCharitableAidSchema>;
