import { z } from 'zod';

const categories = ['Street', 'Custom', 'Trail'] as const;

const MotorcycleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number(),
  category: z.enum(categories),
  engineCapacity: z.number().min(1).max(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export { IMotorcycle, MotorcycleZodSchema };
