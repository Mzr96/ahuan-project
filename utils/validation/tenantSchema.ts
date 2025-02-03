import { z } from "zod";

const ColorsSchema = z.object({
  primary: z.string(),
  "on-primary": z.string(),
  "primary-darken-1": z.string(),
  "primary-darken-2": z.string(),
  "primary-lighten-1": z.string(),
});

export const TenantSchema = z.object({
  id: z.string(),
  colors: ColorsSchema,
  favicon: z.string().url(), // Ensures it's a valid URL
  logo: z.string().url(), // Ensures it's a valid URL
  name: z.string(),
  phoneNumber: z.string(),
  registerLink: z.string().url(), // Ensures it's a valid URL
});

export type Tenant = z.infer<typeof TenantSchema>;
