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
