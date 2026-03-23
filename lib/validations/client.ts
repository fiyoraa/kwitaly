import * as z from 'zod'

export const clientSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export type ClientFormValues = z.infer<typeof clientSchema>
