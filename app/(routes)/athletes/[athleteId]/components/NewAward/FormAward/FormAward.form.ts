import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string(),
  date: z.coerce.date(), // convierte automáticamente una string ISO a Date
});
