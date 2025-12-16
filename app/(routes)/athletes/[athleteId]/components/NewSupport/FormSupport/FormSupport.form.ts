import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  amount: z.coerce.number().min(1, "El monto debe ser mayor a 0"),
  date: z.coerce.date(), // convierte automáticamente una string ISO a Date
});
