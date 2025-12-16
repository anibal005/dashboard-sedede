import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2),
  discipline: z.string().min(2),
  asociation: z.string().min(6),
  category: z.string(),
  elite: z.boolean(),
  profileImage: z.string().optional()
});
