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
  targetAmount: z.preprocess(
    (v) => parseInt(z.string().parse(v), 10) * 100,
    z.number().positive({ message: 'Please enter an amount larger than RM0.' })
  ),
  aboutCampaign: z.string().trim(),
  image: z.string().nullable(),
  endDatetime: z.string().refine((v) => v === '' || new Date(v) > new Date(), {
    message: 'Please select an end date and time that is later than now.',
  }),
  published: z.boolean(),
});

export const CreateFundraisingCampaignSchema = FundraisingCampaignSchema.pick({ name: true });

export type CreateFundraisingCampaign = z.infer<typeof CreateFundraisingCampaignSchema>;

export const UpdateFundraisingCampaignSchema = FundraisingCampaignSchema.pick({ name: true }).merge(
  FundraisingCampaignSchema.omit({ name: true }).partial()
);

export type UpdateFundraisingCampaign = z.infer<typeof UpdateFundraisingCampaignSchema>;

const VolunteerEventSchema = z.object({
  name: z.string().trim().max(255),
  categories: z.string().trim().array(),
  openings: z
    .string()
    .transform((v) => (v === '' ? undefined : parseInt(v, 10)))
    .refine((v) => v === undefined || v > 0, { message: 'Please enter a number that is larger than 0.' }),
  volunteerCount: z.string().transform((v) => parseInt(v, 10)),
  location: z.string().trim().max(255),
  aboutEvent: z.string().trim(),
  image: z.string().nullable(),
  startDatetime: z.string().refine((v) => v === '' || new Date(v) > new Date(), {
    message: 'Please select a start date and time that is later than now.',
  }),
  endDatetime: z.string(),
  applicationDeadline: z.string().refine((v) => v === '' || new Date(v) > new Date(), {
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

const openingsMoreThanVolunteerCount = {
  check: function ({ openings, volunteerCount }: z.infer<typeof VolunteerEventSchemaPartial>) {
    if (!openings || !volunteerCount) return true;

    return openings >= volunteerCount;
  },
  message: function ({ volunteerCount }: z.infer<typeof VolunteerEventSchemaPartial>) {
    return {
      message: `Please ensure number of openings is more than number of volunteers (${volunteerCount}).`,
      path: ['openings'],
    };
  },
};

export const CreateVolunteerEventSchema = VolunteerEventSchema.pick({ name: true });

export type CreateVolunteerEvent = z.infer<typeof CreateVolunteerEventSchema>;

export const UpdateVolunteerEventSchema = VolunteerEventSchema.pick({ name: true })
  .merge(VolunteerEventSchema.omit({ name: true }).partial())
  .refine(endDatetimeAfterStartDatetime.check, endDatetimeAfterStartDatetime.message)
  .refine(applicationDeadlineBeforeStartDatetime.check, applicationDeadlineBeforeStartDatetime.message)
  .refine(openingsMoreThanVolunteerCount.check, openingsMoreThanVolunteerCount.message);

export type UpdateVolunteerEvent = z.infer<typeof UpdateVolunteerEventSchema>;

const CharitableAidSchema = z.object({
  name: z.string().trim().max(255),
  categories: z.string().trim().array(),
  openings: z
    .string()
    .transform((v) => (v === '' ? undefined : parseInt(v, 10)))
    .refine((v) => v === undefined || v > 0, { message: 'Please enter a number that is larger than 0.' }),
  receiverCount: z.string().transform((v) => parseInt(v, 10)),
  location: z.string().trim().max(255),
  aboutAid: z.string().trim(),
  image: z.string().nullable(),
  applicationDeadline: z.string().refine((v) => v === '' || new Date(v) > new Date(), {
    message: 'Please select an application deadline that is later than now.',
  }),
  published: z.boolean(),
});

const CharitableAidSchemaPartial = CharitableAidSchema.partial();

const openingsMoreThanReceiverCount = {
  check: function ({ openings, receiverCount }: z.infer<typeof CharitableAidSchemaPartial>) {
    if (!openings || !receiverCount) return true;

    return openings >= receiverCount;
  },
  message: function ({ receiverCount }: z.infer<typeof CharitableAidSchemaPartial>) {
    return {
      message: `Please ensure number of openings is more than number of receivers (${receiverCount}).`,
      path: ['openings'],
    };
  },
};

export const CreateCharitableAidSchema = CharitableAidSchema.pick({ name: true });

export type CreateCharitableAid = z.infer<typeof CreateCharitableAidSchema>;

export const UpdateCharitableAidSchema = CharitableAidSchema.pick({ name: true })
  .merge(CharitableAidSchema.omit({ name: true }).partial())
  .refine(openingsMoreThanReceiverCount.check, openingsMoreThanReceiverCount.message);

export type UpdateCharitableAid = z.infer<typeof UpdateCharitableAidSchema>;
